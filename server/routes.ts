import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import passport from "./auth";
import { storage, DEFAULT_USER_ID } from "./storage";
import { insertDepositSchema, insertWithdrawalSchema, insertSystemSettingSchema, insertUserSchema, loginSchema } from "@shared/schema";

function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === "development") {
    next();
    return;
  }
  
  const isAdmin = (req as any).isAdmin;
  if (!isAdmin) {
    return res.status(403).json({ error: "Unauthorized - Admin access required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validated = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(validated.email);
      if (existingUser) {
        return res.status(400).json({ error: "البريد الإلكتروني مستخدم بالفعل" });
      }

      const hashedPassword = await bcrypt.hash(validated.password, 10);
      
      const user = await storage.createUser({
        email: validated.email,
        password: hashedPassword,
      });

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "خطأ في تسجيل الدخول" });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    try {
      loginSchema.parse(req.body);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }

    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: "خطأ في تسجيل الدخول" });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "خطأ في تسجيل الدخول" });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "خطأ في تسجيل الخروج" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "غير مسجل الدخول" });
    }
    const user = req.user as any;
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  app.get("/api/current-user", async (req, res) => {
    try {
      const user = await storage.getUser(DEFAULT_USER_ID);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      res.json(settings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/settings/:key", async (req, res) => {
    try {
      const setting = await storage.getSetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }
      res.json(setting);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/settings", adminMiddleware, async (req, res) => {
    try {
      const validated = insertSystemSettingSchema.parse(req.body);
      const setting = await storage.setSetting(validated);
      res.json(setting);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/deposits", async (req, res) => {
    try {
      const validated = insertDepositSchema.parse(req.body);
      const deposit = await storage.createDeposit(validated);
      res.json(deposit);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/deposits", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (userId) {
        const deposits = await storage.getDepositsByUserId(userId);
        return res.json(deposits);
      }
      const deposits = await storage.getAllDeposits();
      res.json(deposits);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/deposits/:id", async (req, res) => {
    try {
      const deposit = await storage.getDeposit(req.params.id);
      if (!deposit) {
        return res.status(404).json({ error: "Deposit not found" });
      }
      res.json(deposit);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/deposits/:id", adminMiddleware, async (req, res) => {
    try {
      const deposit = await storage.updateDeposit(req.params.id, req.body);
      if (!deposit) {
        return res.status(404).json({ error: "Deposit not found" });
      }
      
      if (req.body.status === "confirmed" && deposit.userId) {
        const user = await storage.getUser(deposit.userId);
        if (user) {
          const depositAmount = parseFloat(deposit.amount);
          let bonusAmount = 0;
          
          if (!user.firstDepositBonusUsed) {
            bonusAmount = depositAmount * 0.10;
            const requiredTradingVolume = depositAmount * 10;
            
            await storage.updateUser(user.id, { 
              usdtBalance: (parseFloat(user.usdtBalance) + depositAmount).toString(),
              depositBonus: (parseFloat(user.depositBonus) + bonusAmount).toString(),
              firstDepositBonusUsed: true,
              depositAmount: (parseFloat(user.depositAmount) + depositAmount).toString(),
            });
          } else {
            await storage.updateUser(user.id, { 
              usdtBalance: (parseFloat(user.usdtBalance) + depositAmount).toString(),
              depositAmount: (parseFloat(user.depositAmount) + depositAmount).toString(),
            });
          }
        }
      }
      
      res.json(deposit);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/withdrawals", async (req, res) => {
    try {
      const validated = insertWithdrawalSchema.parse(req.body);
      
      const user = await storage.getUser(validated.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const totalAmount = parseFloat(validated.amount) + parseFloat(validated.fee || "0.5");
      if (parseFloat(user.usdtBalance) < totalAmount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }
      
      const withdrawal = await storage.createWithdrawal(validated);
      
      const newBalance = (parseFloat(user.usdtBalance) - totalAmount).toString();
      await storage.updateUser(user.id, { usdtBalance: newBalance });
      
      res.json(withdrawal);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/withdrawals", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (userId) {
        const withdrawals = await storage.getWithdrawalsByUserId(userId);
        return res.json(withdrawals);
      }
      const withdrawals = await storage.getAllWithdrawals();
      res.json(withdrawals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/withdrawals/:id", async (req, res) => {
    try {
      const withdrawal = await storage.getWithdrawal(req.params.id);
      if (!withdrawal) {
        return res.status(404).json({ error: "Withdrawal not found" });
      }
      res.json(withdrawal);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/withdrawals/:id", adminMiddleware, async (req, res) => {
    try {
      const withdrawal = await storage.updateWithdrawal(req.params.id, req.body);
      if (!withdrawal) {
        return res.status(404).json({ error: "Withdrawal not found" });
      }
      res.json(withdrawal);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/trading/complete", async (req, res) => {
    try {
      const { userId, amount } = req.body;
      
      if (!userId || !amount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const tradingAmount = parseFloat(amount);
      if (isNaN(tradingAmount) || tradingAmount <= 0 || tradingAmount > 10000) {
        return res.status(400).json({ error: "Invalid trading amount" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const newTradingVolume = parseFloat(user.tradingVolume) + tradingAmount;
      
      await storage.updateUser(user.id, {
        tradingVolume: newTradingVolume.toString(),
      });
      
      res.json({ 
        success: true, 
        newTradingVolume,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/bonus/claim", async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const depositBonus = parseFloat(user.depositBonus);
      const tradingVolume = parseFloat(user.tradingVolume);
      const requiredVolume = parseFloat(user.depositAmount) * 10;
      
      if (depositBonus <= 0) {
        return res.status(400).json({ error: "No bonus available" });
      }
      
      if (tradingVolume < requiredVolume) {
        return res.status(400).json({ 
          error: "Trading volume requirement not met",
          current: tradingVolume,
          required: requiredVolume,
        });
      }
      
      await storage.updateUser(user.id, {
        bonusWithdrawable: (parseFloat(user.bonusWithdrawable) + depositBonus).toString(),
        usdtBalance: (parseFloat(user.usdtBalance) + depositBonus).toString(),
        depositBonus: "0",
      });
      
      const updatedUser = await storage.getUser(user.id);
      
      res.json({ 
        success: true,
        bonusClaimed: depositBonus,
        user: updatedUser,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/admin/users", adminMiddleware, async (req, res) => {
    try {
      res.json({ message: "Admin users endpoint - to be implemented" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

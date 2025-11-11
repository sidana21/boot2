import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDepositSchema, insertWithdrawalSchema, insertSystemSettingSchema } from "@shared/schema";

function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const isAdmin = (req as any).isAdmin;
  if (!isAdmin) {
    return res.status(403).json({ error: "Unauthorized - Admin access required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  
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
          const newBalance = (parseFloat(user.usdtBalance) + parseFloat(deposit.amount)).toString();
          await storage.updateUser(user.id, { usdtBalance: newBalance });
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

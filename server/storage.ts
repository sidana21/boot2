import { 
  type User, 
  type InsertUser, 
  type Deposit, 
  type InsertDeposit, 
  type Withdrawal, 
  type InsertWithdrawal,
  type SystemSetting,
  type InsertSystemSetting,
  users,
  deposits,
  withdrawals,
  systemSettings
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByReferralCode(code: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getUserStats(): Promise<{ totalUsers: number; activeUsers: number }>;
  getReferralsByUserId(userId: string): Promise<User[]>;
  
  createDeposit(deposit: InsertDeposit): Promise<Deposit>;
  getDeposit(id: string): Promise<Deposit | undefined>;
  getDepositsByUserId(userId: string): Promise<Deposit[]>;
  getAllDeposits(): Promise<Deposit[]>;
  updateDeposit(id: string, updates: Partial<Deposit>): Promise<Deposit | undefined>;
  
  createWithdrawal(withdrawal: InsertWithdrawal): Promise<Withdrawal>;
  getWithdrawal(id: string): Promise<Withdrawal | undefined>;
  getWithdrawalsByUserId(userId: string): Promise<Withdrawal[]>;
  getAllWithdrawals(): Promise<Withdrawal[]>;
  updateWithdrawal(id: string, updates: Partial<Withdrawal>): Promise<Withdrawal | undefined>;
  
  getSetting(key: string): Promise<SystemSetting | undefined>;
  setSetting(setting: InsertSystemSetting): Promise<SystemSetting>;
  getAllSettings(): Promise<SystemSetting[]>;
}

const ADMIN_EMAILS = new Set(['abooh052@gmail.com']);

export class DatabaseStorage implements IStorage {
  private initialized = false;

  async init() {
    if (this.initialized) return;
    
    const existingSettings = await this.getAllSettings();
    if (existingSettings.length === 0) {
      await this.setSetting({
        key: "deposit_address",
        value: "TXYZexampleAddressForUSDTDeposits12345",
      });
      await this.setSetting({
        key: "eth_deposit_address",
        value: "0xExampleETHAddressForDeposits123456789",
      });
      await this.setSetting({
        key: "binance_api_key",
        value: "",
      });
      await this.setSetting({
        key: "binance_api_secret",
        value: "",
      });
    }
    
    this.initialized = true;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!username) return undefined;
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByReferralCode(code: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.referralCode, code));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const isAdmin = ADMIN_EMAILS.has(insertUser.email);
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        isAdmin,
      })
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getUserStats(): Promise<{ totalUsers: number; activeUsers: number }> {
    const allUsers = await this.getAllUsers();
    const totalUsers = allUsers.length;
    const activeUsers = allUsers.filter(user => 
      parseFloat(user.usdtBalance) > 0 || parseFloat(user.depositAmount) > 0
    ).length;
    
    return { totalUsers, activeUsers };
  }

  async getReferralsByUserId(userId: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.referredBy, userId));
  }

  async createDeposit(insertDeposit: InsertDeposit): Promise<Deposit> {
    const [deposit] = await db
      .insert(deposits)
      .values(insertDeposit)
      .returning();
    return deposit;
  }

  async getDeposit(id: string): Promise<Deposit | undefined> {
    const [deposit] = await db.select().from(deposits).where(eq(deposits.id, id));
    return deposit || undefined;
  }

  async getDepositsByUserId(userId: string): Promise<Deposit[]> {
    return await db.select().from(deposits).where(eq(deposits.userId, userId));
  }

  async getAllDeposits(): Promise<Deposit[]> {
    return await db.select().from(deposits);
  }

  async updateDeposit(id: string, updates: Partial<Deposit>): Promise<Deposit | undefined> {
    if (updates.status === "confirmed" && !updates.confirmedAt) {
      updates.confirmedAt = new Date();
    }
    
    const [deposit] = await db
      .update(deposits)
      .set(updates)
      .where(eq(deposits.id, id))
      .returning();
    return deposit || undefined;
  }

  async createWithdrawal(insertWithdrawal: InsertWithdrawal): Promise<Withdrawal> {
    const [withdrawal] = await db
      .insert(withdrawals)
      .values(insertWithdrawal)
      .returning();
    return withdrawal;
  }

  async getWithdrawal(id: string): Promise<Withdrawal | undefined> {
    const [withdrawal] = await db.select().from(withdrawals).where(eq(withdrawals.id, id));
    return withdrawal || undefined;
  }

  async getWithdrawalsByUserId(userId: string): Promise<Withdrawal[]> {
    return await db.select().from(withdrawals).where(eq(withdrawals.userId, userId));
  }

  async getAllWithdrawals(): Promise<Withdrawal[]> {
    return await db.select().from(withdrawals);
  }

  async updateWithdrawal(id: string, updates: Partial<Withdrawal>): Promise<Withdrawal | undefined> {
    if (updates.status === "completed" && !updates.processedAt) {
      updates.processedAt = new Date();
    }
    
    const [withdrawal] = await db
      .update(withdrawals)
      .set(updates)
      .where(eq(withdrawals.id, id))
      .returning();
    return withdrawal || undefined;
  }

  async getSetting(key: string): Promise<SystemSetting | undefined> {
    const [setting] = await db.select().from(systemSettings).where(eq(systemSettings.key, key));
    return setting || undefined;
  }

  async setSetting(insertSetting: InsertSystemSetting): Promise<SystemSetting> {
    const existing = await this.getSetting(insertSetting.key);
    
    if (existing) {
      const [setting] = await db
        .update(systemSettings)
        .set({ ...insertSetting, updatedAt: new Date() })
        .where(eq(systemSettings.key, insertSetting.key))
        .returning();
      return setting;
    } else {
      const [setting] = await db
        .insert(systemSettings)
        .values(insertSetting)
        .returning();
      return setting;
    }
  }

  async getAllSettings(): Promise<SystemSetting[]> {
    return await db.select().from(systemSettings);
  }
}

const dbStorage = new DatabaseStorage();
dbStorage.init().catch(console.error);

export const storage = dbStorage;

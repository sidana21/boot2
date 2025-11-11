import { 
  type User, 
  type InsertUser, 
  type Deposit, 
  type InsertDeposit, 
  type Withdrawal, 
  type InsertWithdrawal,
  type SystemSetting,
  type InsertSystemSetting
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private deposits: Map<string, Deposit>;
  private withdrawals: Map<string, Withdrawal>;
  private settings: Map<string, SystemSetting>;

  constructor() {
    this.users = new Map();
    this.deposits = new Map();
    this.withdrawals = new Map();
    this.settings = new Map();
    
    this.settings.set("deposit_address", {
      id: randomUUID(),
      key: "deposit_address",
      value: "TXYZexampleAddressForUSDTDeposits12345",
      updatedAt: new Date(),
    });
    this.settings.set("binance_api_key", {
      id: randomUUID(),
      key: "binance_api_key",
      value: "",
      updatedAt: new Date(),
    });
    this.settings.set("binance_api_secret", {
      id: randomUUID(),
      key: "binance_api_secret",
      value: "",
      updatedAt: new Date(),
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const referralCode = `TAP${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: false,
      usdtBalance: "0",
      rtcBalance: "0",
      referralCode,
      depositAmount: "0",
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createDeposit(insertDeposit: InsertDeposit): Promise<Deposit> {
    const id = randomUUID();
    const deposit: Deposit = {
      id,
      userId: insertDeposit.userId,
      amount: insertDeposit.amount,
      status: insertDeposit.status || "pending",
      txHash: insertDeposit.txHash || null,
      network: insertDeposit.network || "TRC20",
      createdAt: new Date(),
      confirmedAt: null,
    };
    this.deposits.set(id, deposit);
    return deposit;
  }

  async getDeposit(id: string): Promise<Deposit | undefined> {
    return this.deposits.get(id);
  }

  async getDepositsByUserId(userId: string): Promise<Deposit[]> {
    return Array.from(this.deposits.values()).filter(d => d.userId === userId);
  }

  async getAllDeposits(): Promise<Deposit[]> {
    return Array.from(this.deposits.values());
  }

  async updateDeposit(id: string, updates: Partial<Deposit>): Promise<Deposit | undefined> {
    const deposit = this.deposits.get(id);
    if (!deposit) return undefined;
    
    const updatedDeposit = { ...deposit, ...updates };
    this.deposits.set(id, updatedDeposit);
    return updatedDeposit;
  }

  async createWithdrawal(insertWithdrawal: InsertWithdrawal): Promise<Withdrawal> {
    const id = randomUUID();
    const withdrawal: Withdrawal = {
      id,
      userId: insertWithdrawal.userId,
      amount: insertWithdrawal.amount,
      address: insertWithdrawal.address,
      status: insertWithdrawal.status || "pending",
      txHash: insertWithdrawal.txHash || null,
      network: insertWithdrawal.network || "TRC20",
      fee: insertWithdrawal.fee || "0.5",
      createdAt: new Date(),
      processedAt: null,
    };
    this.withdrawals.set(id, withdrawal);
    return withdrawal;
  }

  async getWithdrawal(id: string): Promise<Withdrawal | undefined> {
    return this.withdrawals.get(id);
  }

  async getWithdrawalsByUserId(userId: string): Promise<Withdrawal[]> {
    return Array.from(this.withdrawals.values()).filter(w => w.userId === userId);
  }

  async getAllWithdrawals(): Promise<Withdrawal[]> {
    return Array.from(this.withdrawals.values());
  }

  async updateWithdrawal(id: string, updates: Partial<Withdrawal>): Promise<Withdrawal | undefined> {
    const withdrawal = this.withdrawals.get(id);
    if (!withdrawal) return undefined;
    
    const updatedWithdrawal = { ...withdrawal, ...updates };
    this.withdrawals.set(id, updatedWithdrawal);
    return updatedWithdrawal;
  }

  async getSetting(key: string): Promise<SystemSetting | undefined> {
    return this.settings.get(key);
  }

  async setSetting(insertSetting: InsertSystemSetting): Promise<SystemSetting> {
    const existing = this.settings.get(insertSetting.key);
    const setting: SystemSetting = {
      id: existing?.id || randomUUID(),
      ...insertSetting,
      updatedAt: new Date(),
    };
    this.settings.set(insertSetting.key, setting);
    return setting;
  }

  async getAllSettings(): Promise<SystemSetting[]> {
    return Array.from(this.settings.values());
  }
}

export const storage = new MemStorage();

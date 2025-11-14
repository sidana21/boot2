import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  username: text("username"),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  usdtBalance: decimal("usdt_balance", { precision: 18, scale: 8 }).default("0").notNull(),
  rtcBalance: decimal("rtc_balance", { precision: 18, scale: 2 }).default("0").notNull(),
  referralCode: text("referral_code").unique(),
  referredBy: varchar("referred_by"),
  depositAmount: decimal("deposit_amount", { precision: 18, scale: 8 }).default("0").notNull(),
  depositBonus: decimal("deposit_bonus", { precision: 18, scale: 8 }).default("0").notNull(),
  tradingVolume: decimal("trading_volume", { precision: 18, scale: 8 }).default("0").notNull(),
  bonusWithdrawable: decimal("bonus_withdrawable", { precision: 18, scale: 8 }).default("0").notNull(),
  firstDepositBonusUsed: boolean("first_deposit_bonus_used").default(false).notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  username: true,
  isAdmin: true,
  usdtBalance: true,
  rtcBalance: true,
  referralCode: true,
  depositAmount: true,
  depositBonus: true,
  tradingVolume: true,
  bonusWithdrawable: true,
  firstDepositBonusUsed: true,
}).extend({
  referredBy: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const deposits = pgTable("deposits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  amount: decimal("amount", { precision: 18, scale: 8 }).notNull(),
  status: text("status").notNull().default("pending"),
  txHash: text("tx_hash"),
  network: text("network").default("TRC20").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  confirmedAt: timestamp("confirmed_at"),
});

export const insertDepositSchema = createInsertSchema(deposits).omit({
  id: true,
  createdAt: true,
  confirmedAt: true,
});

export type InsertDeposit = z.infer<typeof insertDepositSchema>;
export type Deposit = typeof deposits.$inferSelect;

export const withdrawals = pgTable("withdrawals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  amount: decimal("amount", { precision: 18, scale: 8 }).notNull(),
  address: text("address").notNull(),
  status: text("status").notNull().default("pending"),
  txHash: text("tx_hash"),
  network: text("network").default("TRC20").notNull(),
  fee: decimal("fee", { precision: 18, scale: 8 }).default("0.5").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at"),
});

export const insertWithdrawalSchema = createInsertSchema(withdrawals).omit({
  id: true,
  createdAt: true,
  processedAt: true,
});

export type InsertWithdrawal = z.infer<typeof insertWithdrawalSchema>;
export type Withdrawal = typeof withdrawals.$inferSelect;

export const systemSettings = pgTable("system_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSystemSettingSchema = createInsertSchema(systemSettings).omit({
  id: true,
  updatedAt: true,
});

export type InsertSystemSetting = z.infer<typeof insertSystemSettingSchema>;
export type SystemSetting = typeof systemSettings.$inferSelect;

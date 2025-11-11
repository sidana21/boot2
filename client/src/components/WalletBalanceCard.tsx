import { Card } from "@/components/ui/card";
import { Coins, TrendingUp, Wallet, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WalletBalanceCardProps {
  balanceUSDT: number;
  balanceRTC: number;
  todayEarnings: number;
  totalEarnings: number;
  depositAmount?: number;
}

export default function WalletBalanceCard({ 
  balanceUSDT, 
  balanceRTC, 
  todayEarnings, 
  totalEarnings,
  depositAmount = 0 
}: WalletBalanceCardProps) {
  const dailyPotential = depositAmount * 0.20;
  
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-2 border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary pulse-soft" />
          <h2 className="text-lg font-semibold">محفظتي</h2>
        </div>
        {depositAmount > 0 && (
          <Badge className="bg-accent/20 text-accent border-accent">
            نشط ⚡
          </Badge>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-background">
            <p className="text-xs text-muted-foreground mb-1">رصيد USDT</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tabular-nums text-primary">{balanceUSDT.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-background">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-secondary" />
              <p className="text-xs text-muted-foreground">عملة RTC</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tabular-nums text-secondary">{balanceRTC.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-accent" />
              <p className="text-sm text-muted-foreground">أرباح اليوم</p>
            </div>
            <p className="text-2xl font-bold text-accent tabular-nums">+{todayEarnings.toFixed(2)}</p>
          </div>
          
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Coins className="w-4 h-4 text-primary" />
              <p className="text-sm text-muted-foreground">إجمالي الأرباح</p>
            </div>
            <p className="text-2xl font-bold tabular-nums">{totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        {depositAmount > 0 && (
          <div className="p-3 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">إمكانية الربح اليومي</p>
                <p className="text-lg font-bold text-accent tabular-nums">
                  ~{dailyPotential.toFixed(2)} USDT
                </p>
              </div>
              <Badge className="bg-accent text-accent-foreground">
                20% يومياً
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Coins, TrendingUp, Wallet } from "lucide-react";

interface WalletBalanceCardProps {
  balance: number;
  todayEarnings: number;
  totalEarnings: number;
}

export default function WalletBalanceCard({ balance, todayEarnings, totalEarnings }: WalletBalanceCardProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">محفظتي</h2>
        <Wallet className="w-5 h-5 text-primary" />
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">الرصيد المتاح</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tabular-nums">{balance.toFixed(2)}</span>
            <span className="text-2xl font-semibold text-accent">USDT</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-primary" />
              <p className="text-sm text-muted-foreground">أرباح اليوم</p>
            </div>
            <p className="text-2xl font-bold text-primary tabular-nums">+{todayEarnings.toFixed(2)}</p>
          </div>
          
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Coins className="w-4 h-4 text-accent" />
              <p className="text-sm text-muted-foreground">إجمالي الأرباح</p>
            </div>
            <p className="text-2xl font-bold tabular-nums">{totalEarnings.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

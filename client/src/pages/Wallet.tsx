import DepositWithdrawForm from "@/components/DepositWithdrawForm";
import { Card } from "@/components/ui/card";
import { Wallet as WalletIcon, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Sparkles } from "lucide-react";

export default function Wallet() {
  const currentBalanceUSDT = 25.50;
  const currentBalanceRTC = 1000;
  const totalDeposits = 20.00;
  const totalWithdrawals = 15.00;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-accent/10 pulse-soft">
          <WalletIcon className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">المحفظة</h1>
          <p className="text-sm text-muted-foreground">إدارة رصيدك</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-background">
          <div className="flex items-center gap-2 mb-2">
            <WalletIcon className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">رصيد USDT</p>
          </div>
          <p className="text-3xl font-bold tabular-nums text-primary">{currentBalanceUSDT.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">USDT</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-background">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <p className="text-sm text-muted-foreground">رصيد RTC</p>
          </div>
          <p className="text-3xl font-bold tabular-nums text-secondary">{currentBalanceRTC.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground mt-1">RTC Coin</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownToLine className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground">إجمالي الإيداعات</p>
          </div>
          <p className="text-3xl font-bold text-accent tabular-nums">{totalDeposits.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">USDT</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpFromLine className="w-4 h-4 text-destructive" />
            <p className="text-sm text-muted-foreground">إجمالي السحوبات</p>
          </div>
          <p className="text-3xl font-bold tabular-nums">{totalWithdrawals.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">USDT</p>
        </Card>
      </div>

      <DepositWithdrawForm
        currentBalance={currentBalanceUSDT}
        minDeposit={5}
        minWithdraw={10}
        withdrawFee={0.5}
      />

      <Card className="p-4 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 border-2 border-secondary/30">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-secondary pulse-soft" />
          <h3 className="font-bold">ما هي عملة RTC؟</h3>
        </div>
        <div className="space-y-2 text-sm">
          <p>🪙 <span className="font-semibold">RTC (Replit Tap Coin)</span> هي عملة التكبيس الخاصة بك!</p>
          <p>✨ تكسب 10 RTC مع كل تكبيسة</p>
          <p>🎁 يمكن استبدال RTC بمكافآت ومزايا خاصة قريباً</p>
          <p>📈 احفظ عملاتك لفرص قادمة مميزة!</p>
        </div>
      </Card>
    </div>
  );
}

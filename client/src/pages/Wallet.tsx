import DepositWithdrawForm from "@/components/DepositWithdrawForm";
import { Card } from "@/components/ui/card";
import { Wallet as WalletIcon, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export default function Wallet() {
  const currentBalance = 25.50;
  const totalDeposits = 20.00;
  const totalWithdrawals = 15.00;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-accent/10">
          <WalletIcon className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">المحفظة</h1>
          <p className="text-sm text-muted-foreground">إدارة رصيدك</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <WalletIcon className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">الرصيد الحالي</p>
          </div>
          <p className="text-3xl font-bold tabular-nums">{currentBalance.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">USDT</p>
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
        currentBalance={currentBalance}
        minDeposit={5}
        minWithdraw={10}
        withdrawFee={0.5}
      />
    </div>
  );
}

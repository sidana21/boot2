import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DepositWithdrawForm from "@/components/DepositWithdrawForm";
import DepositAddress from "@/components/DepositAddress";
import PaymentVerificationTimer from "@/components/PaymentVerificationTimer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet as WalletIcon, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Sparkles } from "lucide-react";
import type { SystemSetting } from "@shared/schema";

export default function Wallet() {
  const { toast } = useToast();
  const currentBalanceUSDT = 25.50;
  const currentBalanceRTC = 1000;
  const totalDeposits = 20.00;
  const totalWithdrawals = 15.00;
  const [showVerificationTimer, setShowVerificationTimer] = useState(false);

  const { data: settings = [] } = useQuery<SystemSetting[]>({
    queryKey: ["/api/settings"],
  });

  const depositAddress = settings.find(s => s.key === "deposit_address")?.value || "TXYZexampleAddressForUSDTDeposits12345";

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

      <Tabs defaultValue="deposit" dir="rtl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit" data-testid="tab-deposit-address">
            <ArrowDownToLine className="w-4 h-4 ml-2" />
            إيداع
          </TabsTrigger>
          <TabsTrigger value="withdraw" data-testid="tab-withdraw">
            <ArrowUpFromLine className="w-4 h-4 ml-2" />
            سحب
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="space-y-4">
          <DepositAddress address={depositAddress} network="TRC20" />
          
          {!showVerificationTimer && (
            <Button
              className="w-full"
              onClick={() => {
                setShowVerificationTimer(true);
                toast({
                  title: "بدء التحقق",
                  description: "سيتم التحقق من إيداعك تلقائياً",
                });
              }}
              data-testid="button-start-verification"
            >
              قمت بالإرسال - تحقق من الإيداع
            </Button>
          )}
          
          {showVerificationTimer && (
            <PaymentVerificationTimer
              onVerificationComplete={() => {
                toast({
                  title: "تم التأكيد! ✓",
                  description: "تمت إضافة الرصيد إلى محفظتك",
                });
              }}
            />
          )}
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-4">
          <DepositWithdrawForm
            currentBalance={currentBalanceUSDT}
            minDeposit={5}
            minWithdraw={10}
            withdrawFee={0.5}
          />
        </TabsContent>
      </Tabs>

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

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DepositWithdrawForm from "@/components/DepositWithdrawForm";
import DepositAddress from "@/components/DepositAddress";
import PaymentVerificationTimer from "@/components/PaymentVerificationTimer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Wallet as WalletIcon, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Sparkles, Coins, Gift, TrendingUpIcon, Zap } from "lucide-react";
import type { SystemSetting, Deposit, InsertDeposit, User } from "@shared/schema";

export default function Wallet() {
  const { toast } = useToast();
  const [showVerificationTimer, setShowVerificationTimer] = useState(false);
  const [currentDepositId, setCurrentDepositId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>("");

  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/current-user"],
  });

  const { data: settings = [] } = useQuery<SystemSetting[]>({
    queryKey: ["/api/settings"],
  });

  const depositAddress = settings.find(s => s.key === "deposit_address")?.value || "TXYZexampleAddressForUSDTDeposits12345";
  
  const currentBalanceUSDT = parseFloat(currentUser?.usdtBalance || "0");
  const currentBalanceRTC = parseFloat(currentUser?.rtcBalance || "0");
  const totalDeposits = parseFloat(currentUser?.depositAmount || "0");
  const totalWithdrawals = 0;

  const createDepositMutation = useMutation({
    mutationFn: async (depositData: InsertDeposit) => {
      const res = await apiRequest("POST", "/api/deposits", depositData);
      return res.json();
    },
    onSuccess: (newDeposit) => {
      queryClient.invalidateQueries({ queryKey: ["/api/deposits"] });
      setCurrentDepositId(newDeposit.id);
      setShowVerificationTimer(true);
      toast({
        title: "بدء التحقق",
        description: "سيتم التحقق من إيداعك تلقائياً",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في بدء عملية التحقق",
        variant: "destructive",
      });
    },
  });

  const handleStartVerification = () => {
    if (!currentUser) {
      toast({
        title: "خطأ",
        description: "فشل تحميل بيانات المستخدم",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(depositAmount);
    
    if (!depositAmount || isNaN(amount) || amount < 5) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال مبلغ صحيح (الحد الأدنى 5 USDT)",
        variant: "destructive",
      });
      return;
    }

    const depositData: InsertDeposit = {
      userId: currentUser.id,
      amount: depositAmount,
      status: "pending",
      network: "TRC20",
      txHash: null,
    };
    createDepositMutation.mutate(depositData);
  };

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
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deposit-amount">المبلغ المودع (USDT)</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    min="5"
                    step="0.01"
                    placeholder="أدخل المبلغ الذي أرسلته"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    data-testid="input-deposit-amount"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    الحد الأدنى: 5 USDT
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={handleStartVerification}
                  disabled={createDepositMutation.isPending}
                  data-testid="button-start-verification"
                >
                  {createDepositMutation.isPending ? "جاري المعالجة..." : "قمت بالإرسال - تحقق من الإيداع"}
                </Button>
              </div>
            </Card>
          )}
          
          {showVerificationTimer && currentDepositId && (
            <PaymentVerificationTimer
              depositId={currentDepositId}
              onVerificationComplete={() => {
                toast({
                  title: "تم التأكيد",
                  description: "تمت إضافة الرصيد إلى محفظتك",
                });
                setShowVerificationTimer(false);
                setCurrentDepositId(null);
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
          <div className="flex items-start gap-2">
            <Coins className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
            <p><span className="font-semibold">RTC (Replit Tap Coin)</span> هي عملة التكبيس الخاصة بك!</p>
          </div>
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p>تكسب 10 RTC مع كل تكبيسة</p>
          </div>
          <div className="flex items-start gap-2">
            <Gift className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p>يمكن استبدال RTC بمكافآت ومزايا خاصة قريباً</p>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUpIcon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p>احفظ عملاتك لفرص قادمة مميزة!</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

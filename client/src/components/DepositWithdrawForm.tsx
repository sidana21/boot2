import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownToLine, ArrowUpFromLine, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface DepositWithdrawFormProps {
  currentBalance: number;
  minDeposit?: number;
  minWithdraw?: number;
  withdrawFee?: number;
}

export default function DepositWithdrawForm({ 
  currentBalance,
  minDeposit = 5,
  minWithdraw = 10,
  withdrawFee = 0.5
}: DepositWithdrawFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState("");
  const [depositAddress, setDepositAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount < minDeposit) {
      toast({
        title: t('error'),
        description: t('minimumDeposit', { min: minDeposit.toString() }),
        variant: "destructive",
      });
      return;
    }
    if (!depositAddress) {
      toast({
        title: t('error'),
        description: t('enterWalletAddress'),
        variant: "destructive",
      });
      return;
    }
    console.log('Deposit:', { amount, address: depositAddress });
    toast({
      title: t('depositRequest'),
      description: t('depositRequestSent', { amount: amount.toString() }),
    });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount < minWithdraw) {
      toast({
        title: t('error'),
        description: t('minimumWithdraw', { min: minWithdraw.toString() }),
        variant: "destructive",
      });
      return;
    }
    if (amount > currentBalance) {
      toast({
        title: t('error'),
        description: t('insufficientBalance'),
        variant: "destructive",
      });
      return;
    }
    if (!withdrawAddress) {
      toast({
        title: t('error'),
        description: t('enterWalletAddress'),
        variant: "destructive",
      });
      return;
    }
    console.log('Withdraw:', { amount, address: withdrawAddress });
    toast({
      title: t('withdrawRequest'),
      description: t('withdrawRequestSent', { amount: amount.toString() }),
    });
  };

  return (
    <Card className="p-6">
      <Tabs defaultValue="deposit" dir="rtl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit" className="gap-2" data-testid="tab-deposit">
            <ArrowDownToLine className="w-4 h-4" />
            {t('deposit')}
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="gap-2" data-testid="tab-withdraw">
            <ArrowUpFromLine className="w-4 h-4" />
            {t('withdraw')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="space-y-4 mt-6">
          <div>
            <Label htmlFor="deposit-amount">{t('amountLabel')}</Label>
            <Input
              id="deposit-amount"
              type="number"
              placeholder={`الحد الأدنى ${minDeposit} USDT`}
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="text-lg mt-2"
              data-testid="input-deposit-amount"
            />
          </div>

          <div>
            <Label htmlFor="deposit-address">عنوان محفظتك (TRC20)</Label>
            <Input
              id="deposit-address"
              placeholder="T..."
              value={depositAddress}
              onChange={(e) => setDepositAddress(e.target.value)}
              className="font-mono mt-2"
              data-testid="input-deposit-address"
            />
          </div>

          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex gap-2">
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-semibold">معلومات الإيداع:</p>
                <p>• الحد الأدنى: {minDeposit} USDT</p>
                <p>• الشبكة: TRC20 (Tron)</p>
                <p>• وقت التأكيد: 5-10 دقائق</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleDeposit} 
            className="w-full"
            size="lg"
            data-testid="button-submit-deposit"
          >
            إيداع الآن
          </Button>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-4 mt-6">
          <div className="p-4 bg-muted rounded-lg mb-4">
            <p className="text-sm text-muted-foreground">الرصيد المتاح</p>
            <p className="text-2xl font-bold tabular-nums">{currentBalance.toFixed(2)} USDT</p>
          </div>

          <div>
            <Label htmlFor="withdraw-amount">المبلغ (USDT)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder={`الحد الأدنى ${minWithdraw} USDT`}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="text-lg mt-2"
              data-testid="input-withdraw-amount"
            />
            {withdrawAmount && (
              <p className="text-sm text-muted-foreground mt-1">
                رسوم السحب: {withdrawFee} USDT | ستستلم: {Math.max(0, parseFloat(withdrawAmount) - withdrawFee).toFixed(2)} USDT
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="withdraw-address">عنوان المحفظة (TRC20)</Label>
            <Input
              id="withdraw-address"
              placeholder="T..."
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              className="font-mono mt-2"
              data-testid="input-withdraw-address"
            />
          </div>

          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <div className="flex gap-2">
              <Info className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-semibold">شروط السحب:</p>
                <p>• يجب إيداع {minDeposit} USDT أولاً لتفعيل السحب</p>
                <p>• الحد الأدنى: {minWithdraw} USDT</p>
                <p>• رسوم السحب: {withdrawFee} USDT</p>
                <p>• وقت المعالجة: 24-48 ساعة</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleWithdraw}
            className="w-full"
            size="lg"
            data-testid="button-submit-withdraw"
          >
            سحب الآن
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { InsertWithdrawal } from "@shared/schema";
import { useAuth } from "@/contexts/AuthContext";

interface DepositWithdrawFormProps {
  currentBalance: number;
  minDeposit?: number;
  minWithdraw?: number;
  withdrawFee?: number;
  selectedNetwork: "TRC20" | "ETH";
}

export default function DepositWithdrawForm({ 
  currentBalance,
  minDeposit = 5,
  minWithdraw = 10,
  withdrawFee = 0.5,
  selectedNetwork
}: DepositWithdrawFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const createWithdrawalMutation = useMutation({
    mutationFn: async (withdrawalData: InsertWithdrawal) => {
      const res = await apiRequest("POST", "/api/withdrawals", withdrawalData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/withdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/current-user"] });
      setWithdrawAmount("");
      setWithdrawAddress("");
      toast({
        title: t('withdrawRequest'),
        description: "تم إرسال طلب السحب بنجاح. سيتم المعالجة خلال 24-48 ساعة",
      });
    },
    onError: (error: any) => {
      toast({
        title: t('error'),
        description: error.message || "فشل في إرسال طلب السحب",
        variant: "destructive",
      });
    },
  });

  const handleWithdraw = () => {
    if (!user) {
      toast({
        title: t('error'),
        description: t('loadUserDataFailed'),
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(withdrawAmount);
    
    if (!withdrawAmount || isNaN(amount) || amount < minWithdraw) {
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

    const withdrawalData: InsertWithdrawal = {
      userId: user.id,
      amount: withdrawAmount,
      address: withdrawAddress,
      status: "pending",
      network: selectedNetwork,
      fee: withdrawFee.toString(),
      txHash: null,
    };

    createWithdrawalMutation.mutate(withdrawalData);
  };

  const canWithdraw = currentBalance >= minWithdraw;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="withdraw-amount">المبلغ (USDT)</Label>
          <Input
            id="withdraw-amount"
            type="number"
            placeholder={`الحد الأدنى ${minWithdraw} USDT`}
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="text-lg mt-2"
            disabled={!canWithdraw || createWithdrawalMutation.isPending}
            data-testid="input-withdraw-amount"
          />
          {withdrawAmount && (
            <p className="text-sm text-muted-foreground mt-1">
              رسوم السحب: {withdrawFee} USDT | ستستلم: {Math.max(0, parseFloat(withdrawAmount) - withdrawFee).toFixed(2)} USDT
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="withdraw-address">
            عنوان المحفظة ({selectedNetwork === "TRC20" ? "TRC20" : "ETH"})
          </Label>
          <Input
            id="withdraw-address"
            placeholder={selectedNetwork === "TRC20" ? "T..." : "0x..."}
            value={withdrawAddress}
            onChange={(e) => setWithdrawAddress(e.target.value)}
            className="font-mono mt-2"
            disabled={!canWithdraw || createWithdrawalMutation.isPending}
            data-testid="input-withdraw-address"
          />
        </div>

        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="flex gap-2">
            <Info className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-semibold">شروط السحب:</p>
              <p>• الحد الأدنى: {minWithdraw} USDT</p>
              <p>• رسوم السحب: {withdrawFee} USDT</p>
              <p>• وقت المعالجة: 24-48 ساعة</p>
              <p>• تأكد من صحة عنوان المحفظة - العمليات لا يمكن إلغاؤها</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleWithdraw}
          className="w-full"
          size="lg"
          disabled={!canWithdraw || createWithdrawalMutation.isPending}
          data-testid="button-submit-withdraw"
        >
          {createWithdrawalMutation.isPending ? t('processing') : 'سحب الآن'}
        </Button>

        {!canWithdraw && (
          <p className="text-sm text-center text-destructive">
            {t('noBalanceToWithdraw')}
          </p>
        )}
      </div>
    </Card>
  );
}

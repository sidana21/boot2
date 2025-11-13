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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Wallet as WalletIcon, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Sparkles, Coins, Gift, TrendingUpIcon, Zap } from "lucide-react";
import type { SystemSetting, Deposit, InsertDeposit, User, Withdrawal } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Wallet() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showVerificationTimer, setShowVerificationTimer] = useState(false);
  const [currentDepositId, setCurrentDepositId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState<"TRC20" | "ETH">("TRC20");

  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/current-user"],
  });

  const { data: settings = [] } = useQuery<SystemSetting[]>({
    queryKey: ["/api/settings"],
  });

  const { data: withdrawals = [] } = useQuery<Withdrawal[]>({
    queryKey: ["/api/withdrawals"],
  });

  const usdtDepositAddress = settings.find(s => s.key === "deposit_address")?.value || "TXYZexampleAddressForUSDTDeposits12345";
  const ethDepositAddress = settings.find(s => s.key === "eth_deposit_address")?.value || "0xExampleETHAddressForDeposits123456789";
  const depositAddress = selectedNetwork === "TRC20" ? usdtDepositAddress : ethDepositAddress;
  
  const pendingWithdrawals = withdrawals.filter(w => w.status === "pending");
  
  const currentBalanceUSDT = parseFloat(currentUser?.usdtBalance || "0");
  const currentBalanceRTC = parseFloat(currentUser?.rtcBalance || "0");
  const totalDeposits = parseFloat(currentUser?.depositAmount || "0");
  const totalWithdrawals = withdrawals
    .filter(w => w.status === "completed")
    .reduce((sum, w) => sum + parseFloat(w.amount), 0);

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
        title: t('verificationStarted'),
        description: t('verificationAutomatic'),
      });
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('verificationFailed'),
        variant: "destructive",
      });
    },
  });

  const handleStartVerification = () => {
    if (!currentUser) {
      toast({
        title: t('error'),
        description: t('loadUserDataFailed'),
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(depositAmount);
    
    if (!depositAmount || isNaN(amount) || amount < 5) {
      toast({
        title: t('error'),
        description: t('minimumDeposit', { min: '5' }),
        variant: "destructive",
      });
      return;
    }

    const depositData: InsertDeposit = {
      userId: currentUser.id,
      amount: depositAmount,
      status: "pending",
      network: selectedNetwork,
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
          <h1 className="text-2xl font-bold">{t('walletTitle')}</h1>
          <p className="text-sm text-muted-foreground">{t('manageBalance')}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-background">
          <div className="flex items-center gap-2 mb-2">
            <WalletIcon className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">{t('usdtBalanceLabel')}</p>
          </div>
          <p className="text-3xl font-bold tabular-nums text-primary">{currentBalanceUSDT.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('usdt')}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-background">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <p className="text-sm text-muted-foreground">{t('rtcBalanceLabel')}</p>
          </div>
          <p className="text-3xl font-bold tabular-nums text-secondary">{currentBalanceRTC.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground mt-1">RTC Coin</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownToLine className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground">{t('totalDeposits')}</p>
          </div>
          <p className="text-3xl font-bold text-accent tabular-nums">{totalDeposits.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('usdt')}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpFromLine className="w-4 h-4 text-destructive" />
            <p className="text-sm text-muted-foreground">{t('totalWithdrawals')}</p>
          </div>
          <p className="text-3xl font-bold tabular-nums">{totalWithdrawals.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('usdt')}</p>
        </Card>
      </div>

      <Tabs defaultValue="deposit" dir="rtl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit" data-testid="tab-deposit-address">
            <ArrowDownToLine className="w-4 h-4 ml-2" />
            {t('deposit')}
          </TabsTrigger>
          <TabsTrigger value="withdraw" data-testid="tab-withdraw">
            <ArrowUpFromLine className="w-4 h-4 ml-2" />
            {t('withdraw')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="space-y-4">
          <Card className="p-4">
            <Label className="text-sm font-semibold mb-3 block">{t('selectNetwork')}</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={selectedNetwork === "TRC20" ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedNetwork("TRC20")}
                data-testid="button-select-usdt"
              >
                USDT (TRC20)
              </Button>
              <Button
                variant={selectedNetwork === "ETH" ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedNetwork("ETH")}
                data-testid="button-select-eth"
              >
                ETH (Ethereum)
              </Button>
            </div>
          </Card>

          <DepositAddress 
            address={depositAddress} 
            network={selectedNetwork} 
            currency={selectedNetwork === "TRC20" ? "USDT" : "ETH"}
          />
          
          {!showVerificationTimer && (
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deposit-amount">{t('depositAmountLabel')}</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    min="5"
                    step="0.01"
                    placeholder={t('enterDepositAmount')}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    data-testid="input-deposit-amount"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('minimumAmount', { min: '5' })}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={handleStartVerification}
                  disabled={createDepositMutation.isPending}
                  data-testid="button-start-verification"
                >
                  {createDepositMutation.isPending ? t('processing') : t('iSentVerify')}
                </Button>
              </div>
            </Card>
          )}
          
          {showVerificationTimer && currentDepositId && (
            <PaymentVerificationTimer
              depositId={currentDepositId}
              onVerificationComplete={() => {
                toast({
                  title: t('verificationComplete'),
                  description: t('balanceAdded'),
                });
                setShowVerificationTimer(false);
                setCurrentDepositId(null);
              }}
            />
          )}
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-4">
          {currentBalanceUSDT < 10 && (
            <Card className="p-4 bg-destructive/10 border-destructive/30">
              <div className="flex items-center gap-2">
                <ArrowUpFromLine className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-semibold text-destructive">{t('noBalanceToWithdraw')}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('minimumWithdraw', { min: '10' })}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {pendingWithdrawals.length > 0 && (
            <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <ArrowUpFromLine className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                {t('pendingWithdrawals')}
              </h4>
              <div className="space-y-2">
                {pendingWithdrawals.map((withdrawal) => (
                  <div key={withdrawal.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                    <div>
                      <p className="font-semibold">{withdrawal.amount} USDT</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(withdrawal.createdAt).toLocaleString('ar-SA')}
                      </p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                      معلق
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-4 bg-gradient-to-br from-primary/10 to-background border-primary/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{t('availableToWithdraw')}</p>
              <WalletIcon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary tabular-nums" data-testid="available-balance">
              {currentBalanceUSDT.toFixed(2)} USDT
            </p>
          </Card>

          <DepositWithdrawForm
            currentBalance={currentBalanceUSDT}
            minDeposit={5}
            minWithdraw={10}
            withdrawFee={0.5}
            selectedNetwork={selectedNetwork}
          />
        </TabsContent>
      </Tabs>

      <Card className="p-4 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 border-2 border-secondary/30">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-secondary pulse-soft" />
          <h3 className="font-bold">{t('whatIsRTC')}</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <Coins className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
            <p><span className="font-semibold">RTC (Replit Tap Coin)</span> {t('rtcDescription')}</p>
          </div>
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p>{t('rtcEarnRate')}</p>
          </div>
          <div className="flex items-start gap-2">
            <Gift className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p>{t('rtcRewards')}</p>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUpIcon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p>{t('rtcSaveCoins')}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

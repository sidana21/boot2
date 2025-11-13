import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { User } from "@shared/schema";
import WalletBalanceCard from "@/components/WalletBalanceCard";
import TradingBot from "@/components/TradingBot";
import StatsGrid from "@/components/StatsGrid";
import CountdownTimer from "@/components/CountdownTimer";
import TreasureBox from "@/components/TreasureBox";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpFromLine, Users } from "lucide-react";
import { useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['/api/current-user'],
  });
  
  const [dailyEarningMultiplier] = useState(() => {
    return 0.15 + Math.random() * 0.10;
  });
  
  const depositAmount = parseFloat(user?.depositAmount || "0");
  const dailyTarget = depositAmount * dailyEarningMultiplier;
  const [earnedToday, setEarnedToday] = useState(0);
  const totalEarnings = parseFloat(user?.bonusWithdrawable || "0");
  const isTaskComplete = earnedToday >= dailyTarget;

  const tradingMutation = useMutation({
    mutationFn: async (amount: number) => {
      const response = await fetch('/api/trading/complete', {
        method: 'POST',
        body: JSON.stringify({ userId: user?.id, amount }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to complete trading');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/current-user'] });
    },
  });

  const handleEarningsUpdate = (usdtAmount: number, rtcAmount: number) => {
    setEarnedToday(prev => prev + usdtAmount);
    tradingMutation.mutate(usdtAmount);
    console.log(`Trade completed! Earned: ${usdtAmount.toFixed(4)} USDT + ${rtcAmount.toFixed(0)} RTC`);
  };

  const handleTimerComplete = () => {
    console.log('Timer completed! Resetting daily task...');
    setEarnedToday(0);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user) {
    return <div className="text-center p-8">Failed to load user data</div>;
  }

  return (
    <div className="space-y-6">
      <WalletBalanceCard
        balanceUSDT={parseFloat(user.usdtBalance)}
        balanceRTC={parseFloat(user.rtcBalance)}
        todayEarnings={earnedToday}
        totalEarnings={totalEarnings}
        depositAmount={depositAmount}
      />

      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4 hover-elevate pulse-soft"
          onClick={() => setLocation('/wallet')}
          data-testid="button-goto-deposit"
        >
          <ArrowDownToLine className="w-5 h-5 text-accent" />
          <span className="text-sm">{t('deposit')}</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4 hover-elevate pulse-soft"
          onClick={() => setLocation('/wallet')}
          data-testid="button-goto-withdraw"
        >
          <ArrowUpFromLine className="w-5 h-5 text-destructive" />
          <span className="text-sm">{t('withdraw')}</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4 hover-elevate pulse-soft"
          onClick={() => setLocation('/referrals')}
          data-testid="button-goto-referrals"
        >
          <Users className="w-5 h-5 text-primary" />
          <span className="text-sm">{t('invite')}</span>
        </Button>
      </div>

      {isTaskComplete ? (
        <CountdownTimer onComplete={handleTimerComplete} />
      ) : (
        <TradingBot
          onEarningsUpdate={handleEarningsUpdate}
          dailyTarget={dailyTarget}
          currentEarnings={earnedToday}
        />
      )}

      <TreasureBox 
        userId={user.id}
        depositBonus={parseFloat(user.depositBonus)}
        tradingVolume={parseFloat(user.tradingVolume)}
        requiredVolume={depositAmount * 10}
        isFirstDeposit={!user.firstDepositBonusUsed}
      />

      <StatsGrid
        referralsCount={12}
        referralEarnings={24.50}
        weeklyEarnings={70.00}
        daysActive={15}
      />

      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-center">
          💰 <span className="font-semibold">{t('profitPercentageToday')}</span> {(dailyEarningMultiplier * 100).toFixed(1)}% {t('fromYourDeposit')}
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">
          {t('profitChangesDaily')}
        </p>
      </div>
    </div>
  );
}

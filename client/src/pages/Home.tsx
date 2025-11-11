import { useState, useEffect } from "react";
import WalletBalanceCard from "@/components/WalletBalanceCard";
import TappingButton from "@/components/TappingButton";
import StatsGrid from "@/components/StatsGrid";
import CountdownTimer from "@/components/CountdownTimer";
import LuckyWheel from "@/components/LuckyWheel";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpFromLine, Users } from "lucide-react";
import { useLocation } from "wouter";

// TODO: remove mock functionality - replace with real user data
export default function Home() {
  const [, setLocation] = useLocation();
  const [taps, setTaps] = useState(0);
  const [depositAmount] = useState(10); // TODO: get from user's actual deposit
  const [balanceUSDT, setBalanceUSDT] = useState(25.50);
  const [balanceRTC, setBalanceRTC] = useState(0);
  const [canSpinWheel, setCanSpinWheel] = useState(true); // TODO: check if user can spin today
  const [dailyEarningMultiplier] = useState(() => {
    // Random daily multiplier between 15-25% (averaging 20%)
    return 0.15 + Math.random() * 0.10;
  });
  
  const maxTaps = 100;
  const baseEarningPerTap = depositAmount * dailyEarningMultiplier / maxTaps;
  const rtcPerTap = 10; // 10 RTC per tap
  
  const earnedUSDT = taps * baseEarningPerTap;
  const earnedRTC = taps * rtcPerTap;
  const totalEarnings = 125.50;
  const isTaskComplete = taps >= maxTaps;

  useEffect(() => {
    // Update balances when taps change
    setBalanceUSDT(25.50 + earnedUSDT);
    setBalanceRTC(earnedRTC);
  }, [taps, earnedUSDT, earnedRTC]);

  const handleTap = () => {
    if (taps < maxTaps) {
      setTaps(prev => prev + 1);
      const newEarning = (taps + 1) * baseEarningPerTap;
      console.log(`Tap ${taps + 1}/${maxTaps} - Earned: ${newEarning.toFixed(4)} USDT + ${rtcPerTap} RTC`);
    }
  };

  const handleTimerComplete = () => {
    console.log('Timer completed! Resetting daily task...');
    setTaps(0);
    setCanSpinWheel(true);
  };

  const handleWheelSpin = (prize: number) => {
    console.log(`Won ${prize} RTC from lucky wheel!`);
    setBalanceRTC(prev => prev + prize);
    
    const prizeInUSDT = prize / 100;
    setBalanceUSDT(prev => prev + prizeInUSDT);
    
    setCanSpinWheel(false);
  };

  return (
    <div className="space-y-6">
      <WalletBalanceCard
        balanceUSDT={balanceUSDT}
        balanceRTC={balanceRTC}
        todayEarnings={earnedUSDT}
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
          <span className="text-sm">إيداع</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4 hover-elevate pulse-soft"
          onClick={() => setLocation('/wallet')}
          data-testid="button-goto-withdraw"
        >
          <ArrowUpFromLine className="w-5 h-5 text-destructive" />
          <span className="text-sm">سحب</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4 hover-elevate pulse-soft"
          onClick={() => setLocation('/referrals')}
          data-testid="button-goto-referrals"
        >
          <Users className="w-5 h-5 text-primary" />
          <span className="text-sm">دعوة</span>
        </Button>
      </div>

      {isTaskComplete ? (
        <CountdownTimer onComplete={handleTimerComplete} />
      ) : (
        <TappingButton
          currentTaps={taps}
          maxTaps={maxTaps}
          onTap={handleTap}
          earnedRTC={earnedRTC}
          earnedUSDT={earnedUSDT}
        />
      )}

      <LuckyWheel 
        onSpin={handleWheelSpin}
        canSpin={canSpinWheel}
      />

      <StatsGrid
        referralsCount={12}
        referralEarnings={24.50}
        weeklyEarnings={70.00}
        daysActive={15}
      />

      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-center">
          💰 <span className="font-semibold">نسبة الربح اليوم:</span> {(dailyEarningMultiplier * 100).toFixed(1)}% من إيداعك
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">
          الربح يتغير عشوائياً كل يوم (15-25%)
        </p>
      </div>
    </div>
  );
}

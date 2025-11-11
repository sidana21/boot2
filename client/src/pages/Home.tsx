import { useState } from "react";
import WalletBalanceCard from "@/components/WalletBalanceCard";
import TappingButton from "@/components/TappingButton";
import StatsGrid from "@/components/StatsGrid";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpFromLine, Users } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [taps, setTaps] = useState(0);
  const maxTaps = 100;
  
  const balance = 25.50;
  const todayEarnings = (taps / maxTaps) * 10;
  const totalEarnings = 125.50;

  const handleTap = () => {
    if (taps < maxTaps) {
      setTaps(prev => prev + 1);
      console.log(`Tap ${taps + 1}/${maxTaps}`);
    }
  };

  return (
    <div className="space-y-6">
      <WalletBalanceCard
        balance={balance}
        todayEarnings={todayEarnings}
        totalEarnings={totalEarnings}
      />

      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4"
          onClick={() => setLocation('/wallet')}
          data-testid="button-goto-deposit"
        >
          <ArrowDownToLine className="w-5 h-5 text-accent" />
          <span className="text-sm">إيداع</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4"
          onClick={() => setLocation('/wallet')}
          data-testid="button-goto-withdraw"
        >
          <ArrowUpFromLine className="w-5 h-5 text-destructive" />
          <span className="text-sm">سحب</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4"
          onClick={() => setLocation('/referrals')}
          data-testid="button-goto-referrals"
        >
          <Users className="w-5 h-5 text-primary" />
          <span className="text-sm">دعوة</span>
        </Button>
      </div>

      <TappingButton
        currentTaps={taps}
        maxTaps={maxTaps}
        onTap={handleTap}
        earnedToday={todayEarnings}
      />

      <StatsGrid
        referralsCount={12}
        referralEarnings={24.50}
        weeklyEarnings={70.00}
        daysActive={15}
      />
    </div>
  );
}

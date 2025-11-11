import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock, RefreshCw } from "lucide-react";

interface CountdownTimerProps {
  onComplete?: () => void;
}

export default function CountdownTimer({ onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      
      if (diff <= 0) {
        onComplete?.();
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <Card className="p-6 bg-gradient-to-br from-destructive/10 via-background to-accent/10 border-2 border-destructive/30">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Clock className="w-6 h-6 text-destructive pulse-soft" />
        <h3 className="text-lg font-bold">العد التنازلي لمهمة جديدة</h3>
        <RefreshCw className="w-5 h-5 text-accent pulse-soft" />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-lg bg-gradient-to-br from-destructive/20 to-background">
          <div className="text-4xl font-bold tabular-nums text-destructive">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground mt-1">ساعة</div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-br from-accent/20 to-background">
          <div className="text-4xl font-bold tabular-nums text-accent">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground mt-1">دقيقة</div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-background">
          <div className="text-4xl font-bold tabular-nums text-primary">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground mt-1">ثانية</div>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        🔄 سيتم تجديد مهمتك اليومية تلقائياً
      </p>
    </Card>
  );
}

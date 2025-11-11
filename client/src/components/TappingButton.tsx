import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MousePointer2, Trophy, Zap } from "lucide-react";
import usdtCoinImage from "@assets/generated_images/USDT_coin_button_611e0f4d.png";

interface TappingButtonProps {
  currentTaps: number;
  maxTaps: number;
  onTap: () => void;
  earnedToday: number;
}

export default function TappingButton({ currentTaps, maxTaps, onTap, earnedToday }: TappingButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const progress = (currentTaps / maxTaps) * 100;
  const remaining = maxTaps - currentTaps;

  const handleTap = () => {
    if (remaining > 0) {
      setIsPressed(true);
      onTap();
      setTimeout(() => setIsPressed(false), 100);
    }
  };

  return (
    <Card className="p-8">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-bold">تكبيس يومي</h3>
          </div>
          <p className="text-3xl font-bold tabular-nums text-primary">
            {currentTaps} / {maxTaps}
          </p>
          <p className="text-sm text-muted-foreground mt-1">تكبيسة</p>
        </div>

        <div className="w-full max-w-md">
          <Progress value={progress} className="h-3" />
          <p className="text-center text-xs text-muted-foreground mt-2">
            {remaining > 0 ? `متبقي ${remaining} تكبيسة` : "اكتمل اليوم!"}
          </p>
        </div>

        <div className="relative">
          <Button
            size="icon"
            onClick={handleTap}
            disabled={remaining === 0}
            data-testid="button-tap"
            className={`w-48 h-48 rounded-full transition-all duration-100 ${
              isPressed ? "scale-95" : "scale-100"
            } ${remaining === 0 ? "opacity-50 cursor-not-allowed" : "hover-elevate active-elevate-2"}`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={usdtCoinImage} alt="USDT" className="w-32 h-32 object-contain" />
              {remaining > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <MousePointer2 className="w-12 h-12 text-primary-foreground opacity-80" />
                </div>
              )}
            </div>
          </Button>
          
          {isPressed && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-ping">
              <Zap className="w-8 h-8 text-accent" />
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <p className="text-sm text-muted-foreground">ربحت اليوم</p>
          </div>
          <p className="text-3xl font-bold text-accent tabular-nums mt-1">
            +{earnedToday.toFixed(2)} USDT
          </p>
        </div>
      </div>
    </Card>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MousePointer2, Trophy, Zap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TappingButtonProps {
  currentTaps: number;
  maxTaps: number;
  onTap: () => void;
  earnedRTC: number;
  earnedUSDT: number;
}

export default function TappingButton({ currentTaps, maxTaps, onTap, earnedRTC, earnedUSDT }: TappingButtonProps) {
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
    <Card className="p-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-accent pulse-soft" />
            <h3 className="text-xl font-bold">تكبيس يومي</h3>
            <Sparkles className="w-5 h-5 text-secondary pulse-soft" />
          </div>
          <p className="text-3xl font-bold tabular-nums text-primary">
            {currentTaps} / {maxTaps}
          </p>
          <p className="text-sm text-muted-foreground mt-1">تكبيسة</p>
        </div>

        <div className="w-full max-w-md">
          <Progress value={progress} className="h-4 bg-muted" />
          <p className="text-center text-xs text-muted-foreground mt-2">
            {remaining > 0 ? `متبقي ${remaining} تكبيسة` : "🎉 اكتمل اليوم!"}
          </p>
        </div>

        <div className="relative">
          <Button
            size="icon"
            onClick={handleTap}
            disabled={remaining === 0}
            data-testid="button-tap"
            className={`w-56 h-56 rounded-full transition-all duration-100 shadow-2xl ${
              isPressed ? "scale-95" : "scale-100"
            } ${remaining === 0 ? "opacity-50 cursor-not-allowed" : "pulse-glow bg-gradient-to-br from-primary via-accent to-secondary"}`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 animate-pulse" />
              <div className="relative text-center">
                <MousePointer2 className="w-16 h-16 text-primary-foreground mx-auto mb-2" />
                <Badge className="bg-primary-foreground/20 text-primary-foreground text-lg font-bold px-4 py-1">
                  RTC
                </Badge>
              </div>
            </div>
          </Button>
          
          {isPressed && (
            <>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-ping">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <div className="absolute top-1/2 -right-4 animate-bounce">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <div className="absolute top-1/2 -left-4 animate-bounce">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-xs text-muted-foreground">عملة RTC</p>
            </div>
            <p className="text-2xl font-bold text-primary tabular-nums text-center">
              +{earnedRTC.toFixed(0)}
            </p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-accent" />
              <p className="text-xs text-muted-foreground">ربح USDT</p>
            </div>
            <p className="text-2xl font-bold text-accent tabular-nums text-center">
              +{earnedUSDT.toFixed(2)}
            </p>
          </Card>
        </div>
      </div>
    </Card>
  );
}

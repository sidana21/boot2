import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Trophy, Zap, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LuckyWheelProps {
  onSpin: (prize: number) => void;
  canSpin: boolean;
}

const PRIZES = [10, 25, 50, 100, 250, 500, 1000, 2500];

export default function LuckyWheel({ onSpin, canSpin }: LuckyWheelProps) {
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastPrize, setLastPrize] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    if (!canSpin || isSpinning) {
      if (!canSpin) {
        toast({
          title: "تنبيه",
          description: "يمكنك تدوير العجلة مرة واحدة يومياً فقط!",
          variant: "destructive",
        });
      }
      return;
    }

    setIsSpinning(true);
    
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const prize = PRIZES[prizeIndex];
    
    const segmentAngle = 360 / PRIZES.length;
    const targetRotation = 360 * 5 + (prizeIndex * segmentAngle) + (segmentAngle / 2);
    const newRotation = rotation + targetRotation;
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setLastPrize(prize);
      onSpin(prize);
      
      toast({
        title: "🎉 مبروك!",
        description: `ربحت ${prize} RTC من عجلة الحظ!`,
      });
    }, 4000);
  };

  const prizeColors = [
    "from-accent/80 to-accent",
    "from-primary/80 to-primary",
    "from-secondary/80 to-secondary",
    "from-destructive/80 to-destructive",
    "from-accent/80 to-accent",
    "from-primary/80 to-primary",
    "from-secondary/80 to-secondary",
    "from-destructive/80 to-destructive",
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 via-secondary/5 to-primary/10 border-2 border-accent/30">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-accent pulse-soft" />
        <h3 className="text-xl font-bold">عجلة الحظ اليومية</h3>
        <Trophy className="w-6 h-6 text-secondary pulse-soft" />
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-64 h-64">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-destructive drop-shadow-lg" />
          </div>

          <div
            ref={wheelRef}
            className="w-full h-full rounded-full relative overflow-hidden border-4 border-accent shadow-2xl"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          >
            {PRIZES.map((prize, index) => {
              const angle = (360 / PRIZES.length) * index;
              return (
                <div
                  key={index}
                  className={`absolute w-full h-full bg-gradient-to-br ${prizeColors[index]}`}
                  style={{
                    transform: `rotate(${angle}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((Math.PI * 2) / PRIZES.length)}% ${50 - 50 * Math.cos((Math.PI * 2) / PRIZES.length)}%)`,
                  }}
                >
                  <div
                    className="absolute top-8 left-1/2 -translate-x-1/2 text-white font-bold text-lg"
                    style={{
                      transform: `rotate(${(360 / PRIZES.length) / 2}deg)`,
                    }}
                  >
                    {prize}
                  </div>
                </div>
              );
            })}
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-4 border-accent shadow-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSpin}
          disabled={!canSpin || isSpinning}
          size="lg"
          className={`w-full max-w-xs ${isSpinning ? 'pulse-glow' : ''}`}
          data-testid="button-spin-wheel"
        >
          {isSpinning ? (
            <>
              <Sparkles className="w-5 h-5 ml-2 animate-spin" />
              جاري التدوير...
            </>
          ) : canSpin ? (
            <>
              <Trophy className="w-5 h-5 ml-2" />
              دوّر العجلة
            </>
          ) : (
            <>
              <Clock className="w-5 h-5 ml-2" />
              مكتمل لليوم
            </>
          )}
        </Button>

        {lastPrize && (
          <div className="text-center">
            <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
              آخر جائزة: {lastPrize} RTC
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              القيمة: {(lastPrize / 100).toFixed(2)} USDT
            </p>
          </div>
        )}

        <div className="w-full p-4 rounded-lg bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <p className="text-sm font-semibold">كيف تعمل؟</p>
          </div>
          <div className="space-y-1 text-xs">
            <p>🎰 دوّر العجلة مرة واحدة كل 24 ساعة</p>
            <p>🪙 اربح من 10 إلى 2500 RTC</p>
            <p>💰 كل 100 RTC = 1.00 USDT</p>
            <p>✨ الجوائز عشوائية تماماً!</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

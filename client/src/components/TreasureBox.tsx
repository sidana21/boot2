import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, Sparkles, TrendingUp, Lock, Unlock, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface TreasureBoxProps {
  userId: string;
  depositBonus: number;
  tradingVolume: number;
  requiredVolume: number;
  isFirstDeposit: boolean;
}

export default function TreasureBox({ 
  userId,
  depositBonus, 
  tradingVolume, 
  requiredVolume,
  isFirstDeposit,
}: TreasureBoxProps) {
  const { toast } = useToast();
  const [isOpening, setIsOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState<number | null>(null);
  
  const progress = requiredVolume > 0 ? Math.min((tradingVolume / requiredVolume) * 100, 100) : 0;
  const canClaim = depositBonus > 0 && progress >= 100;

  const claimMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/bonus/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to claim bonus');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setClaimedAmount(data.bonusClaimed);
      queryClient.invalidateQueries({ queryKey: ['/api/current-user'] });
      toast({
        title: "🎉 مبروك!",
        description: `تم فتح البونص! حصلت على ${data.bonusClaimed.toFixed(2)} USDT`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleOpen = () => {
    if (!canClaim || isOpening) return;
    
    setIsOpening(true);
    setShowConfetti(true);

    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwF');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    setTimeout(() => {
      claimMutation.mutate();
      setIsOpening(false);
    }, 2000);

    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-2 border-primary/30 relative overflow-hidden">
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  left: `${Math.random() * 100}%`,
                  top: -10,
                }}
                initial={{ y: -10, opacity: 1, scale: 0 }}
                animate={{
                  y: 300,
                  opacity: 0,
                  scale: 1,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center gap-3 mb-6">
        <Gift className="w-6 h-6 text-primary pulse-soft" />
        <h3 className="text-xl font-bold">بونص الإيداع الأول</h3>
        <Trophy className="w-6 h-6 text-accent pulse-soft" />
      </div>

      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="relative"
          animate={isOpening ? {
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, -10, 0],
          } : {}}
          transition={{ duration: 0.5, repeat: isOpening ? 3 : 0 }}
        >
          <div className={`relative w-48 h-48 flex items-center justify-center ${
            canClaim ? 'pulse-glow' : ''
          }`}>
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: canClaim ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: canClaim ? Infinity : 0,
              }}
            >
              <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${
                claimMutation.isSuccess 
                  ? 'from-green-400/20 to-green-600/20 border-green-500'
                  : canClaim 
                    ? 'from-primary/40 to-accent/40 border-primary'
                    : 'from-muted/40 to-muted/20 border-muted'
              } border-4 flex items-center justify-center relative overflow-hidden`}>
                {!claimMutation.isSuccess && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: canClaim ? [-200, 200] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: canClaim ? Infinity : 0,
                      ease: "linear",
                    }}
                  />
                )}
                
                <AnimatePresence mode="wait">
                  {claimMutation.isSuccess ? (
                    <motion.div
                      key="opened"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <Unlock className="w-20 h-20 text-green-500" />
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-500">
                          {claimedAmount ? claimedAmount.toFixed(2) : depositBonus.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">USDT</div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="closed"
                      className="flex flex-col items-center"
                    >
                      {canClaim ? (
                        <Gift className="w-20 h-20 text-primary" />
                      ) : (
                        <Lock className="w-20 h-20 text-muted-foreground" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {!claimMutation.isSuccess && depositBonus > 0 && (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">حجم التداول</span>
              <span className="font-semibold">
                {tradingVolume.toFixed(2)} / {requiredVolume.toFixed(2)} USDT
              </span>
            </div>
            
            <Progress value={progress} className="h-2" data-testid="progress-trading-volume" />
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                {progress.toFixed(0)}%
              </Badge>
              <Badge className="bg-primary text-primary-foreground">
                بونص: {depositBonus.toFixed(2)} USDT
              </Badge>
            </div>
          </div>
        )}

        {!claimMutation.isSuccess && (
          <Button
            onClick={handleOpen}
            disabled={!canClaim || isOpening}
            size="lg"
            className={`w-full max-w-xs ${canClaim ? 'pulse-glow' : ''}`}
            data-testid="button-open-treasure"
          >
            {isOpening ? (
              <>
                <Sparkles className="w-5 h-5 ml-2 animate-spin" />
                جاري الفتح...
              </>
            ) : canClaim ? (
              <>
                <Gift className="w-5 h-5 ml-2" />
                فتح الصندوق
              </>
            ) : depositBonus > 0 ? (
              <>
                <Lock className="w-5 h-5 ml-2" />
                مغلق - أكمل التداول
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 ml-2" />
                قم بأول إيداع
              </>
            )}
          </Button>
        )}

        {claimMutation.isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="bg-green-500 text-white text-lg px-4 py-2">
              <Sparkles className="w-4 h-4 ml-1" />
              تم إضافة البونص لحسابك!
            </Badge>
          </motion.div>
        )}

        <div className="w-full p-4 rounded-lg bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <p className="text-sm font-semibold">كيف يعمل؟</p>
          </div>
          <div className="space-y-1 text-xs">
            <p>💰 الإيداع الأول: احصل على بونص 10%</p>
            <p>📈 أكمل تداول بقيمة 10× من إيداعك</p>
            <p>🎁 افتح الصندوق واسحب البونص</p>
            <p>✨ مثال: إيداع 100 USDT = 10 USDT بونص</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

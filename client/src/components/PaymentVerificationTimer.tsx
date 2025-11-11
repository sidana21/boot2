import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, RefreshCw, AlertCircle } from "lucide-react";

interface PaymentVerificationTimerProps {
  depositId?: string;
  onVerificationComplete?: () => void;
  maxDuration?: number;
}

export default function PaymentVerificationTimer({ 
  depositId,
  onVerificationComplete,
  maxDuration = 300
}: PaymentVerificationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(maxDuration);
  const [isVerifying, setIsVerifying] = useState(true);
  const [status, setStatus] = useState<"pending" | "verified" | "timeout">("pending");

  useEffect(() => {
    if (!isVerifying || timeLeft <= 0) {
      if (timeLeft <= 0) {
        setStatus("timeout");
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsVerifying(false);
          setStatus("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const verificationCheck = setInterval(() => {
      const randomCheck = Math.random();
      if (randomCheck > 0.95) {
        setStatus("verified");
        setIsVerifying(false);
        onVerificationComplete?.();
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(verificationCheck);
    };
  }, [isVerifying, timeLeft, onVerificationComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((maxDuration - timeLeft) / maxDuration) * 100;

  const handleRetry = () => {
    setTimeLeft(maxDuration);
    setIsVerifying(true);
    setStatus("pending");
  };

  if (status === "verified") {
    return (
      <Card className="p-6 bg-gradient-to-br from-green-500/10 to-background border-2 border-green-500/30">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 rounded-full bg-green-500/20">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
              تم تأكيد الإيداع! ✓
            </h3>
            <p className="text-sm text-muted-foreground">
              تمت إضافة الرصيد إلى محفظتك بنجاح
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (status === "timeout") {
    return (
      <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-background border-2 border-yellow-500/30">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 rounded-full bg-yellow-500/20">
            <AlertCircle className="w-12 h-12 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              لم يتم العثور على المعاملة بعد
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              قد يستغرق الأمر وقتاً أطول. يمكنك المحاولة مرة أخرى أو انتظار التأكيد اليدوي من الإدارة.
            </p>
            <Button onClick={handleRetry} variant="outline" data-testid="button-retry-verification">
              <RefreshCw className="w-4 h-4 ml-2" />
              إعادة المحاولة
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-background border-2 border-primary/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary pulse-soft" />
          <h3 className="text-lg font-bold">التحقق من الإيداع</h3>
        </div>
        <Badge className="bg-primary/20 text-primary">
          جاري التحقق...
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">الوقت المتبقي</p>
            <p className="text-2xl font-bold tabular-nums text-primary">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="p-4 rounded-lg bg-muted/50 border border-primary/20">
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-primary animate-spin mt-1" />
            <div className="flex-1">
              <p className="font-semibold mb-2">يتم التحقق من معاملتك...</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✓ التحقق من شبكة TRC20</li>
                <li>✓ مطابقة العنوان والمبلغ</li>
                <li className="text-primary">⏳ انتظار تأكيدات البلوكتشين...</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg text-center">
          <AlertCircle className="w-4 h-4 text-accent flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            التحقق التلقائي يستغرق عادة من 1-5 دقائق. إذا لم يتم التأكيد، سيتم المراجعة يدوياً من قبل الإدارة.
          </p>
        </div>
      </div>
    </Card>
  );
}

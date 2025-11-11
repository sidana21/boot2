import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Copy, CheckCircle, AlertCircle, Clock, Shield, Wallet, ArrowDownToLine, CheckSquare, AlertTriangle } from "lucide-react";

interface DepositAddressProps {
  address: string;
  network?: string;
}

export default function DepositAddress({ address, network = "TRC20" }: DepositAddressProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({
        title: "تم النسخ",
        description: "تم نسخ عنوان الإيداع",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "خطأ",
        description: "فشل نسخ العنوان",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 via-primary/5 to-background border-2 border-accent/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent pulse-soft" />
          <h3 className="text-lg font-bold">عنوان الإيداع</h3>
        </div>
        <Badge className="bg-accent text-accent-foreground">{network}</Badge>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50 border border-accent/20">
          <p className="text-sm text-muted-foreground mb-2 text-center">عنوان محفظة USDT</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm bg-background p-3 rounded border break-all font-mono">
              {address}
            </code>
            <Button
              size="icon"
              onClick={handleCopy}
              className={copied ? "bg-green-500 hover:bg-green-600" : ""}
              data-testid="button-copy-address"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-background p-4 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            تعليمات الإيداع
          </h4>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-bold text-primary">1.</span>
              <span>انسخ عنوان المحفظة أعلاه</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">2.</span>
              <span>افتح محفظتك (Binance، Trust Wallet، إلخ)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">3.</span>
              <span>اختر إرسال USDT عبر شبكة <strong>TRC20</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">4.</span>
              <span>الصق العنوان وأرسل المبلغ</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">5.</span>
              <span>انتظر التأكيد (عادة 1-5 دقائق)</span>
            </li>
          </ol>
        </div>

        <div className="bg-gradient-to-br from-destructive/10 to-background p-4 rounded-lg border border-destructive/20">
          <h4 className="font-semibold mb-2 flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-4 h-4" />
            تحذيرات مهمة
          </h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />
              <span>استخدم شبكة <strong>TRC20</strong> فقط - أي شبكة أخرى ستؤدي لفقدان أموالك</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />
              <span>تأكد من العنوان قبل الإرسال - التحويلات لا يمكن إلغاؤها</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />
              <span>الحد الأدنى للإيداع: 5 USDT</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />
              <span>لا ترسل عملات أخرى غير USDT لهذا العنوان</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-2 p-3 bg-accent/10 rounded-lg">
          <Clock className="w-4 h-4 text-accent" />
          <p className="text-sm text-muted-foreground">
            عادة ما يستغرق التأكيد من 1-5 دقائق
          </p>
        </div>
      </div>
    </Card>
  );
}

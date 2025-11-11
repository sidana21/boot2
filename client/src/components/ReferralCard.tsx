import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Users, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralCardProps {
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  totalEarnings: number;
  commissionRate: number;
}

export default function ReferralCard({ 
  referralCode, 
  referralLink, 
  totalReferrals, 
  totalEarnings,
  commissionRate 
}: ReferralCardProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "تم النسخ!",
        description: `تم نسخ ${label} بنجاح`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast({
        title: "خطأ",
        description: "فشل نسخ النص",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'انضم إلى تطبيق التكبيس',
          text: 'اربح USDT يومياً من خلال التكبيس!',
          url: referralLink,
        });
        console.log('Shared successfully');
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      handleCopy(referralLink, 'رابط الإحالة');
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">برنامج الإحالات</h3>
        </div>
        <Badge className="bg-accent text-accent-foreground">
          عمولة {commissionRate}%
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">إجمالي الإحالات</p>
          </div>
          <p className="text-3xl font-bold tabular-nums">{totalReferrals}</p>
        </div>

        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground">أرباح الإحالات</p>
          </div>
          <p className="text-3xl font-bold text-accent tabular-nums">{totalEarnings.toFixed(2)} USDT</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">كود الإحالة</label>
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-lg text-center">
              {referralCode}
            </div>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => handleCopy(referralCode, 'كود الإحالة')}
              data-testid="button-copy-code"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">رابط الإحالة</label>
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-muted rounded-lg text-sm truncate">
              {referralLink}
            </div>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => handleCopy(referralLink, 'رابط الإحالة')}
              data-testid="button-copy-link"
            >
              <Copy className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              onClick={handleShare}
              data-testid="button-share"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <p className="text-sm">
          <span className="font-semibold">كيف تعمل؟</span> شارك رابط الإحالة مع أصدقائك واحصل على {commissionRate}% من أرباحهم اليومية!
        </p>
      </div>
    </Card>
  );
}

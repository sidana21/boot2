import { useState } from "react";
import ReferralCard from "@/components/ReferralCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Trophy, 
  Gift, 
  Copy, 
  TrendingUp,
  Star,
  Award,
  Sparkles,
  MessageCircle,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SiWhatsapp, SiTelegram, SiFacebook } from "react-icons/si";

interface Referral {
  id: string;
  name: string;
  earnings: number;
  commission: number;
  date: string;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  referrals: number;
  earnings: number;
  isCurrentUser?: boolean;
}

const mockReferrals: Referral[] = [
  { id: '1', name: 'أحمد محمد', earnings: 50.00, commission: 10.00, date: 'منذ 3 أيام' },
  { id: '2', name: 'سارة علي', earnings: 35.00, commission: 7.00, date: 'منذ 5 أيام' },
  { id: '3', name: 'محمد حسن', earnings: 40.00, commission: 8.00, date: 'منذ أسبوع' },
];

const leaderboard: LeaderboardUser[] = [
  { rank: 1, name: 'عبدالله العلي', referrals: 52, earnings: 1240.50 },
  { rank: 2, name: 'فاطمة محمد', referrals: 48, earnings: 1156.00 },
  { rank: 3, name: 'خالد أحمد', referrals: 45, earnings: 1089.00 },
  { rank: 4, name: 'أنت', referrals: 3, earnings: 25.00, isCurrentUser: true },
  { rank: 5, name: 'نور الدين', referrals: 38, earnings: 912.50 },
];

const tierBonuses = [
  { 
    name: 'برونزي', 
    icon: '🥉',
    minReferrals: 0, 
    maxReferrals: 5, 
    commission: 10,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-950'
  },
  { 
    name: 'فضي', 
    icon: '🥈',
    minReferrals: 6, 
    maxReferrals: 15, 
    commission: 15,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100 dark:bg-gray-800'
  },
  { 
    name: 'ذهبي', 
    icon: '🥇',
    minReferrals: 16, 
    maxReferrals: 30, 
    commission: 20,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-950'
  },
  { 
    name: 'ماسي', 
    icon: '💎',
    minReferrals: 31, 
    maxReferrals: 999, 
    commission: 25,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-950'
  },
];

const messageTemplates = [
  {
    title: 'رسالة بسيطة',
    text: 'السلام عليكم! 👋\n\nاكتشفت تطبيق رائع للربح اليومي من USDT 💰\n\nسجل الآن واحصل على بونص ترحيبي:\n{link}\n\nكود الإحالة: {code}'
  },
  {
    title: 'رسالة تحفيزية',
    text: 'مرحباً صديقي! 🎉\n\nأنا شخصياً أربح يومياً من هذا التطبيق الرهيب!\n\nانضم الآن وابدأ رحلتك نحو الربح:\n{link}\n\nاستخدم كودي: {code} واحصل على مكافأة فورية! 🎁'
  },
  {
    title: 'رسالة احترافية',
    text: 'السلام عليكم 🌟\n\nفرصة استثمار مضمونة:\n✅ أرباح يومية مضمونة\n✅ سحب سريع وآمن\n✅ بونص ترحيبي لك\n\nسجل الآن: {link}\nالكود: {code}'
  },
];

export default function Referrals() {
  const { toast } = useToast();
  const totalReferralEarnings = mockReferrals.reduce((sum, r) => sum + r.commission, 0);
  const currentReferrals = mockReferrals.length;
  
  const currentTier = tierBonuses.find(
    tier => currentReferrals >= tier.minReferrals && currentReferrals <= tier.maxReferrals
  ) || tierBonuses[0];
  
  const nextTier = tierBonuses.find(tier => tier.minReferrals > currentReferrals);
  const progressToNextTier = nextTier 
    ? ((currentReferrals - currentTier.minReferrals) / (nextTier.minReferrals - currentTier.minReferrals)) * 100
    : 100;

  const referralCode = "TAP2024XYZ";
  const referralLink = "https://tapapp.example.com/ref/TAP2024XYZ";

  const copyTemplate = (template: string) => {
    const message = template
      .replace('{link}', referralLink)
      .replace('{code}', referralCode);
    
    navigator.clipboard.writeText(message);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ الرسالة بنجاح",
    });
  };

  const shareToWhatsApp = (template: string) => {
    const message = template
      .replace('{link}', referralLink)
      .replace('{code}', referralCode);
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-primary/10 pulse-soft">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">برنامج الإحالات المميز</h1>
          <p className="text-sm text-muted-foreground">ادعُ أصدقائك واربح حتى 25%</p>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-lg font-bold">مكافأة الإحالة الأولى!</h3>
            <p className="text-sm text-muted-foreground">احصل على 5 USDT فوراً عند أول إحالة</p>
          </div>
        </div>
        {currentReferrals === 0 && (
          <div className="p-3 bg-primary/20 rounded-lg border border-primary/30">
            <p className="text-sm font-semibold text-center">
              لم تقم بإحالة أحد بعد! ابدأ الآن واحصل على 5 USDT مباشرة 🎁
            </p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            مستواك الحالي
          </h3>
          <Badge className={`${currentTier.bgColor} ${currentTier.color} text-base px-4 py-1`}>
            {currentTier.icon} {currentTier.name}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">إحالاتك</p>
            <p className="text-3xl font-bold tabular-nums">{currentReferrals}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">نسبة العمولة</p>
            <p className="text-3xl font-bold text-accent tabular-nums">{currentTier.commission}%</p>
          </div>
        </div>

        {nextTier && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">التقدم نحو {nextTier.name} {nextTier.icon}</p>
              <p className="text-sm text-muted-foreground">
                {currentReferrals} / {nextTier.minReferrals}
              </p>
            </div>
            <Progress value={progressToNextTier} className="h-3 mb-2" />
            <p className="text-xs text-muted-foreground text-center">
              تحتاج {nextTier.minReferrals - currentReferrals} إحالة للوصول إلى {nextTier.name} (+{nextTier.commission}% عمولة)
            </p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {tierBonuses.map((tier) => (
            <div
              key={tier.name}
              className={`p-3 rounded-lg border-2 ${
                tier.name === currentTier.name
                  ? 'border-primary bg-primary/10'
                  : 'border-muted bg-muted/30'
              }`}
              data-testid={`tier-${tier.name}`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{tier.icon}</div>
                <p className="text-xs font-semibold mb-1">{tier.name}</p>
                <p className="text-xs text-muted-foreground">{tier.commission}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {tier.minReferrals}+ إحالات
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Tabs defaultValue="share" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="share" data-testid="tab-share">
            <MessageCircle className="w-4 h-4 ml-2" />
            مشاركة
          </TabsTrigger>
          <TabsTrigger value="leaderboard" data-testid="tab-leaderboard">
            <Trophy className="w-4 h-4 ml-2" />
            المسابقة
          </TabsTrigger>
          <TabsTrigger value="referrals" data-testid="tab-referrals">
            <Users className="w-4 h-4 ml-2" />
            أصدقائي
          </TabsTrigger>
        </TabsList>

        <TabsContent value="share" className="space-y-4">
          <ReferralCard
            referralCode={referralCode}
            referralLink={referralLink}
            totalReferrals={currentReferrals}
            totalEarnings={totalReferralEarnings}
            commissionRate={currentTier.commission}
          />

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              رسائل جاهزة للمشاركة
            </h3>
            <div className="space-y-3">
              {messageTemplates.map((template, index) => (
                <Card key={index} className="p-4 bg-muted/30" data-testid={`template-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{template.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-pre-line mb-3 p-3 bg-background rounded">
                    {template.text.replace('{link}', referralLink).replace('{code}', referralCode)}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyTemplate(template.text)}
                      data-testid={`button-copy-template-${index}`}
                    >
                      <Copy className="w-4 h-4 ml-2" />
                      نسخ
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                      onClick={() => shareToWhatsApp(template.text)}
                      data-testid={`button-whatsapp-${index}`}
                    >
                      <SiWhatsapp className="w-4 h-4 ml-2" />
                      واتساب
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-background">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-accent" />
              <div>
                <h3 className="text-lg font-bold">مسابقة الشهر</h3>
                <p className="text-sm text-muted-foreground">أفضل 10 محيلين - جوائز حتى 500 USDT</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-950 border border-yellow-300 dark:border-yellow-800">
                <p className="text-xs text-muted-foreground mb-1">المركز الأول</p>
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">500 USDT</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                <p className="text-xs text-muted-foreground mb-1">المركز الثاني</p>
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-400">300 USDT</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950 border border-orange-300 dark:border-orange-800">
                <p className="text-xs text-muted-foreground mb-1">المركز الثالث</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">200 USDT</p>
              </div>
            </div>

            <div className="space-y-2">
              {leaderboard.map((user) => (
                <Card
                  key={user.rank}
                  className={`p-4 ${
                    user.isCurrentUser 
                      ? 'bg-primary/10 border-primary' 
                      : 'bg-muted/30'
                  }`}
                  data-testid={`leaderboard-${user.rank}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1 ? 'bg-yellow-500 text-white' :
                        user.rank === 2 ? 'bg-gray-400 text-white' :
                        user.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.referrals} إحالة • {user.earnings.toFixed(2)} USDT
                        </p>
                      </div>
                    </div>
                    {user.rank <= 3 && (
                      <Award className="w-6 h-6 text-accent" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-xs text-center">
                المسابقة تنتهي في 15 يوم • ادعُ المزيد من الأصدقاء لتصعد في الترتيب!
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          {mockReferrals.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">أصدقائك ({mockReferrals.length})</h3>
                <Badge variant="secondary">
                  إجمالي العمولات: {totalReferralEarnings.toFixed(2)} USDT
                </Badge>
              </div>
              <div className="space-y-3">
                {mockReferrals.map((referral) => (
                  <Card key={referral.id} className="p-4 hover-elevate" data-testid={`referral-${referral.id}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {referral.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold">{referral.name}</p>
                          <p className="text-sm text-muted-foreground">
                            أرباحه: {referral.earnings.toFixed(2)} USDT
                          </p>
                          <p className="text-xs text-muted-foreground">{referral.date}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">عمولتك</p>
                        <p className="text-lg font-bold text-accent tabular-nums">
                          +{referral.commission.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-bold mb-2">لا توجد إحالات بعد</h3>
              <p className="text-sm text-muted-foreground mb-4">
                ابدأ بدعوة أصدقائك واربح عمولات من أرباحهم!
              </p>
              <Button onClick={() => document.querySelector('[value="share"]')?.dispatchEvent(new Event('click'))}>
                <Share2 className="w-4 h-4 ml-2" />
                ابدأ المشاركة
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

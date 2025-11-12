import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Gift,
  Trophy,
  CheckCircle,
  DollarSign,
  Clock,
  Sparkles
} from "lucide-react";
import rtcLogo from "@assets/1762901598272_1762903589759.jpg";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [activeStats, setActiveStats] = useState({
    totalUsers: 52847,
    totalPaid: 1247850,
    activeToday: 8234,
  });

  const tiers = [
    { icon: '🥉', name: 'برونزي', deposit: '5-50', returns: '15%', color: 'from-orange-100 to-orange-50 dark:from-orange-950 dark:to-orange-900' },
    { icon: '🥈', name: 'فضي', deposit: '51-200', returns: '18%', color: 'from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900' },
    { icon: '🥇', name: 'ذهبي', deposit: '201-500', returns: '20%', color: 'from-yellow-200 to-yellow-100 dark:from-yellow-900 dark:to-yellow-950' },
    { icon: '💎', name: 'ماسي', deposit: '+500', returns: '25%', color: 'from-purple-200 to-purple-100 dark:from-purple-900 dark:to-purple-950' },
  ];

  const features = [
    { icon: TrendingUp, title: 'عوائد يومية مضمونة', desc: 'اربح من 15% إلى 25% يومياً على إيداعك' },
    { icon: Zap, title: 'سحب فوري', desc: 'اسحب أرباحك في أي وقت بدون قيود' },
    { icon: Users, title: 'برنامج إحالات مميز', desc: 'احصل على عمولة تصل إلى 25% من أرباح أصدقائك' },
    { icon: Gift, title: 'مكافآت يومية', desc: 'عجلة الحظ والهدايا اليومية' },
    { icon: Trophy, title: 'مسابقات شهرية', desc: 'جوائز تصل إلى 500 USDT للفائزين' },
    { icon: Shield, title: 'أمان وموثوقية', desc: 'منصة آمنة بنظام حماية متقدم' },
  ];

  const testimonials = [
    { name: 'محمد العلي', amount: '850', days: '30', text: 'أفضل منصة استثمار جربتها! الأرباح يومية والسحب سريع جداً' },
    { name: 'فاطمة أحمد', amount: '1200', days: '45', text: 'بدأت بـ 20 دولار وصلت الآن لأكثر من 1200 دولار! شكراً RTC' },
    { name: 'عبدالله خالد', amount: '2400', days: '60', text: 'نظام الإحالات رائع، أرباحي من الإحالات أكثر من استثماري!' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <img src={rtcLogo} alt="RTC" className="w-12 h-12 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">RTC Club</h1>
              <p className="text-sm text-muted-foreground">نادي الاستثمار الذكي</p>
            </div>
          </div>
          <Button onClick={() => setLocation('/home')} size="lg" data-testid="button-enter-app">
            <ArrowLeft className="w-5 h-5 ml-2" />
            دخول التطبيق
          </Button>
        </header>

        <div className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 text-base bg-gradient-to-r from-primary to-accent">
            <Sparkles className="w-4 h-4 ml-2" />
            أكثر من 50,000 مستخدم يثقون بنا
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent">
            استثمارك الذكي للربح اليومي
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            منصة استثمار مبتكرة تتيح لك ربح عملة USDT المستقرة يومياً من خلال نظام بسيط وآمن
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => setLocation('/home')} className="text-lg px-8" data-testid="button-start-now">
              <DollarSign className="w-5 h-5 ml-2" />
              ابدأ الآن مجاناً
            </Button>
            <Button size="lg" variant="outline" onClick={() => setLocation('/referrals')} className="text-lg px-8" data-testid="button-learn-more">
              <Users className="w-5 h-5 ml-2" />
              برنامج الإحالات
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-background hover-elevate">
            <div className="text-4xl font-bold text-primary mb-2 tabular-nums">
              {activeStats.totalUsers.toLocaleString('ar-SA')}+
            </div>
            <p className="text-muted-foreground">مستخدم نشط</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-accent/10 to-background hover-elevate">
            <div className="text-4xl font-bold text-accent mb-2 tabular-nums">
              ${activeStats.totalPaid.toLocaleString('ar-SA')}
            </div>
            <p className="text-muted-foreground">إجمالي الأرباح الموزعة</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-green-500/10 to-background hover-elevate">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2 tabular-nums">
              {activeStats.activeToday.toLocaleString('ar-SA')}
            </div>
            <p className="text-muted-foreground">مستخدم نشط اليوم</p>
          </Card>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">كيف تبدأ في 3 خطوات؟</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover-elevate" data-testid="step-1">
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h4 className="text-xl font-bold mb-2">قم بإيداع مبلغ بسيط</h4>
              <p className="text-muted-foreground">ابدأ من 5 USDT فقط واختر مستواك</p>
            </Card>
            <Card className="p-6 hover-elevate" data-testid="step-2">
              <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h4 className="text-xl font-bold mb-2">اربح يومياً</h4>
              <p className="text-muted-foreground">نسبة تتراوح بين 15-25% من إيداعك يومياً</p>
            </Card>
            <Card className="p-6 hover-elevate" data-testid="step-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h4 className="text-xl font-bold mb-2">اسحب أرباحك</h4>
              <p className="text-muted-foreground">سحب فوري في أي وقت بدون قيود</p>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">اختر مستواك الاستثماري</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {tiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`p-6 text-center bg-gradient-to-br ${tier.color} border-2 hover-elevate`}
                data-testid={`tier-${tier.name}`}
              >
                <div className="text-5xl mb-3">{tier.icon}</div>
                <h4 className="text-xl font-bold mb-2">{tier.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  إيداع: {tier.deposit} USDT
                </p>
                <div className="text-3xl font-bold text-primary mb-2">{tier.returns}</div>
                <p className="text-xs text-muted-foreground">عوائد يومية</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">لماذا RTC؟</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`feature-${index}`}>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">قصص نجاح حقيقية</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-muted/50 to-background hover-elevate" data-testid={`testimonial-${index}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">عضو منذ {testimonial.days} يوم</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-bold">ربح: ${testimonial.amount} USDT</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/20 via-accent/10 to-background text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">جاهز للبدء؟</h3>
          <p className="text-xl text-muted-foreground mb-6">
            انضم إلى آلاف المستثمرين الناجحين وابدأ رحلتك نحو الحرية المالية اليوم!
          </p>
          <Button size="lg" onClick={() => setLocation('/home')} className="text-lg px-12" data-testid="button-join-now">
            <Sparkles className="w-5 h-5 ml-2" />
            انضم الآن مجاناً
          </Button>
        </Card>

        <Card className="p-6 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-800">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            ⚠️ تحذير مهم
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• التداول والاستثمار ينطويان على مخاطر - لا تستثمر ما لا تستطيع خسارته</li>
            <li>• العوائد السابقة لا تضمن العوائد المستقبلية</li>
            <li>• نوصي بالبدء بمبالغ صغيرة واختبار المنصة أولاً</li>
            <li>• اقرأ الشروط والأحكام قبل البدء</li>
          </ul>
        </Card>

        <footer className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 RTC Club - جميع الحقوق محفوظة</p>
          <p className="mt-2">منصة استثمار مبتكرة للربح اليومي من العملات الرقمية</p>
        </footer>
      </div>
    </div>
  );
}

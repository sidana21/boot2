import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  ArrowDownToLine, 
  Bot, 
  DollarSign,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Gift
} from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NoDepositMessage() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 via-background to-primary/5 border-2 border-accent/30">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertCircle className="w-7 h-7 text-accent" />
            <h3 className="text-xl font-bold">{t('welcomeToTradingPlatform')}</h3>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            {t('needDepositToStart')}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-start gap-3">
            <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold mb-2 text-sm">{t('howBotWorks')}</p>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('depositUSDTMin', { min: '5' })}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('runBotToTrade')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('earnDailyPercent', { min: '15', max: '25' })}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('withdrawAnytimeMin', { min: '10' })}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="p-4 bg-gradient-to-br from-accent/20 to-background border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <p className="font-semibold text-sm">{t('highProfitRate')}</p>
            </div>
            <p className="text-2xl font-bold text-accent">15-25%</p>
            <p className="text-xs text-muted-foreground mt-1">{t('dailyGuaranteedReturn')}</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-primary/20 to-background border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <p className="font-semibold text-sm">{t('easyStart')}</p>
            </div>
            <p className="text-2xl font-bold text-primary">5 USDT</p>
            <p className="text-xs text-muted-foreground mt-1">{t('minDepositLabel')}</p>
          </Card>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-accent/10 border border-green-500/20">
          <div className="flex items-start gap-3">
            <Gift className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1 text-green-600 dark:text-green-400">
                {t('firstDepositBonusLabel')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('getFirstDepositBonus', { percent: '10', multiplier: '10' })}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setLocation('/wallet')}
          size="lg"
          className="w-full bg-gradient-to-r from-accent via-primary to-secondary text-lg font-bold"
          data-testid="button-goto-deposit-from-message"
        >
          <ArrowDownToLine className="w-5 h-5 ml-2" />
          {t('startDepositNow')}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          {t('afterDepositCanStart')}
        </p>
      </div>
    </Card>
  );
}

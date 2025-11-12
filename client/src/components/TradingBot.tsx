import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  TrendingUp, 
  Zap, 
  CheckCircle2,
  Clock,
  Activity,
  Sparkles
} from "lucide-react";
import { SiBinance, SiCoinbase } from "react-icons/si";

interface Trade {
  id: string;
  platform: string;
  icon: any;
  pair: string;
  profit: number;
}

interface TradingBotProps {
  onEarningsUpdate: (usdt: number, rtc: number) => void;
  dailyTarget: number;
  currentEarnings: number;
}

const platforms = [
  { name: 'Binance', icon: SiBinance, color: 'text-yellow-500' },
  { name: 'Coinbase', icon: SiCoinbase, color: 'text-blue-500' },
  { name: 'Bybit', icon: Activity, color: 'text-orange-500' },
  { name: 'OKX', icon: Activity, color: 'text-cyan-500' },
  { name: 'KuCoin', icon: Activity, color: 'text-green-500' },
  { name: 'Kraken', icon: Activity, color: 'text-purple-500' },
];

const tradingPairs = [
  'BTC/USDT',
  'ETH/USDT',
  'BNB/USDT',
  'SOL/USDT',
  'XRP/USDT',
  'ADA/USDT',
  'AVAX/USDT',
  'MATIC/USDT',
];

export default function TradingBot({ 
  onEarningsUpdate, 
  dailyTarget,
  currentEarnings 
}: TradingBotProps) {
  const [isActive, setIsActive] = useState(false);
  const [cycleCountdown, setCycleCountdown] = useState(0);
  const [currentTrades, setCurrentTrades] = useState<Trade[]>([]);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const CYCLE_DURATION = 60; // 1 minute per cycle

  const isComplete = currentEarnings >= dailyTarget;
  const progress = (currentEarnings / dailyTarget) * 100;

  const generateTrades = () => {
    const numTrades = 3 + Math.floor(Math.random() * 4); // 3-6 trades per cycle
    const remainingTarget = dailyTarget - currentEarnings;
    const cycleProfit = Math.min(remainingTarget * (0.15 + Math.random() * 0.20), remainingTarget);
    
    const trades: Trade[] = [];
    let remainingProfit = cycleProfit;
    
    for (let i = 0; i < numTrades; i++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const pair = tradingPairs[Math.floor(Math.random() * tradingPairs.length)];
      
      const isLastTrade = i === numTrades - 1;
      const tradeProfit = isLastTrade 
        ? remainingProfit 
        : remainingProfit * (0.15 + Math.random() * 0.25);
      
      trades.push({
        id: `trade-${Date.now()}-${i}`,
        platform: platform.name,
        icon: platform.icon,
        pair,
        profit: tradeProfit,
      });
      
      remainingProfit -= tradeProfit;
    }
    
    return trades;
  };

  const startCycle = () => {
    if (currentEarnings >= dailyTarget) {
      setIsActive(false);
      return;
    }

    const trades = generateTrades();
    setCurrentTrades(trades);
    setCycleCountdown(CYCLE_DURATION);
    setShowResults(false);
    setIsActive(true);
  };

  const completeCycle = () => {
    setShowResults(true);
    
    const totalProfit = currentTrades.reduce((sum, trade) => sum + trade.profit, 0);
    const totalRTC = totalProfit * 100;
    
    onEarningsUpdate(totalProfit, totalRTC);
    setCompletedCycles(prev => prev + 1);
    
    setTimeout(() => {
      if (currentEarnings + totalProfit < dailyTarget) {
        startCycle();
      } else {
        setIsActive(false);
      }
    }, 3000);
  };

  const stopBot = () => {
    setIsActive(false);
    setCurrentTrades([]);
    setCycleCountdown(0);
    setShowResults(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isActive && cycleCountdown > 0) {
      intervalRef.current = setInterval(() => {
        setCycleCountdown(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && cycleCountdown === 0 && !showResults && currentTrades.length > 0) {
      completeCycle();
    }
  }, [isActive, cycleCountdown, showResults, currentTrades.length]);

  useEffect(() => {
    if (currentEarnings >= dailyTarget && isActive) {
      stopBot();
    }
  }, [currentEarnings, dailyTarget, isActive]);

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bot className="w-6 h-6 text-primary pulse-soft" />
            <h3 className="text-xl font-bold">بوت التداول الذكي</h3>
            <Sparkles className="w-5 h-5 text-accent pulse-soft" />
          </div>
          <p className="text-sm text-muted-foreground">
            تداول آلي على أشهر المنصات العالمية
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">التقدم اليومي</span>
            <span className="font-bold tabular-nums text-primary">
              {currentEarnings.toFixed(2)} / {dailyTarget.toFixed(2)} USDT
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-center text-muted-foreground">
            {isComplete 
              ? "🎉 تم إكمال هدف اليوم!" 
              : `متبقي ${(dailyTarget - currentEarnings).toFixed(2)} USDT`
            }
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {isActive && (
            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              البوت يعمل الآن
            </Badge>
          )}
          
          {completedCycles > 0 && (
            <Badge variant="outline" className="bg-primary/10">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {completedCycles} دورات مكتملة
            </Badge>
          )}
        </div>

        <Button
          onClick={isActive ? stopBot : startCycle}
          disabled={isComplete}
          size="lg"
          className={`w-full ${isActive 
            ? "bg-destructive hover:bg-destructive/90" 
            : "bg-gradient-to-r from-primary via-accent to-secondary"
          }`}
          data-testid="button-toggle-bot"
        >
          {isActive ? (
            <>
              <Activity className="w-5 h-5 ml-2" />
              إيقاف البوت
            </>
          ) : (
            <>
              <Bot className="w-5 h-5 ml-2" />
              {isComplete ? "مكتمل لليوم" : "تشغيل البوت الآن"}
            </>
          )}
        </Button>

        {isActive && currentTrades.length > 0 && (
          <div className="space-y-4">
            {cycleCountdown > 0 && (
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-accent animate-pulse" />
                  <span className="text-3xl font-bold font-mono text-accent tabular-nums">
                    {Math.floor(cycleCountdown / 60)}:{(cycleCountdown % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <Progress 
                  value={(1 - cycleCountdown / CYCLE_DURATION) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  جارٍ تنفيذ {currentTrades.length} صفقات...
                </p>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm">
                  {showResults ? "نتائج الصفقات" : "الصفقات النشطة"}
                </h4>
                <Badge variant="outline" className="mr-auto">
                  {currentTrades.length}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {currentTrades.map((trade, index) => (
                  <Card 
                    key={trade.id} 
                    className={`p-3 transition-all duration-500 ${
                      showResults 
                        ? "bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/30" 
                        : "bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      opacity: showResults ? 1 : 0.9,
                    }}
                    data-testid={`trade-${trade.id}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        {showResults ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <trade.icon className="w-5 h-5 text-primary" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">
                            {trade.platform}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {trade.pair}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {showResults ? (
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-green-500" />
                            <span className="text-sm font-bold text-green-600 dark:text-green-400 tabular-nums">
                              +{trade.profit.toFixed(4)}
                            </span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="bg-accent/10 text-xs">
                            جارٍ التنفيذ
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {showResults && (
                <Card className="p-4 bg-gradient-to-r from-green-500/10 to-accent/10 border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">إجمالي الأرباح</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400 tabular-nums">
                        +{currentTrades.reduce((sum, t) => sum + t.profit, 0).toFixed(4)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        +{(currentTrades.reduce((sum, t) => sum + t.profit, 0) * 100).toFixed(0)} RTC
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {!isActive && currentTrades.length === 0 && (
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1">كيف يعمل البوت؟</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• يفتح عدة صفقات في نفس الوقت على منصات مختلفة</li>
                  <li>• كل دورة تستغرق دقيقة واحدة فقط</li>
                  <li>• الأرباح تضاف تلقائياً بعد كل دورة</li>
                  <li>• البوت يتوقف عند الوصول للهدف اليومي</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

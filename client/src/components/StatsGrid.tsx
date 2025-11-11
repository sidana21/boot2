import { Card } from "@/components/ui/card";
import { Users, Gift, TrendingUp, Calendar } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
}

function StatItem({ icon, label, value, trend }: StatItemProps) {
  return (
    <Card className="p-4 hover-elevate">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
          <p className="text-2xl font-bold tabular-nums">{value}</p>
          {trend && (
            <p className="text-xs text-primary mt-1">{trend}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

interface StatsGridProps {
  referralsCount: number;
  referralEarnings: number;
  weeklyEarnings: number;
  daysActive: number;
}

export default function StatsGrid({ 
  referralsCount, 
  referralEarnings, 
  weeklyEarnings,
  daysActive 
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatItem
        icon={<Users className="w-4 h-4 text-primary" />}
        label="الإحالات"
        value={referralsCount}
      />
      <StatItem
        icon={<Gift className="w-4 h-4 text-accent" />}
        label="أرباح الإحالات"
        value={`${referralEarnings.toFixed(2)} USDT`}
      />
      <StatItem
        icon={<TrendingUp className="w-4 h-4 text-primary" />}
        label="أرباح الأسبوع"
        value={`${weeklyEarnings.toFixed(2)} USDT`}
        trend="+25%"
      />
      <StatItem
        icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
        label="أيام النشاط"
        value={daysActive}
      />
    </div>
  );
}

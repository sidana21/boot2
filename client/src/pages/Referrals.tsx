import ReferralCard from "@/components/ReferralCard";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface Referral {
  id: string;
  name: string;
  earnings: number;
  commission: number;
  date: string;
}

const mockReferrals: Referral[] = [
  { id: '1', name: 'أحمد محمد', earnings: 50.00, commission: 10.00, date: 'منذ 3 أيام' },
  { id: '2', name: 'سارة علي', earnings: 35.00, commission: 7.00, date: 'منذ 5 أيام' },
  { id: '3', name: 'محمد حسن', earnings: 40.00, commission: 8.00, date: 'منذ أسبوع' },
];

export default function Referrals() {
  const totalReferralEarnings = mockReferrals.reduce((sum, r) => sum + r.commission, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-primary/10">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">برنامج الإحالات</h1>
          <p className="text-sm text-muted-foreground">ادعُ أصدقائك واربح 20%</p>
        </div>
      </div>

      <ReferralCard
        referralCode="TAP2024XYZ"
        referralLink="https://tapapp.example.com/ref/TAP2024XYZ"
        totalReferrals={mockReferrals.length}
        totalEarnings={totalReferralEarnings}
        commissionRate={20}
      />

      {mockReferrals.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">أصدقائك ({mockReferrals.length})</h2>
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
      )}
    </div>
  );
}

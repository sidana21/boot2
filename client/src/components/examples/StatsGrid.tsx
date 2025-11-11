import StatsGrid from '../StatsGrid';

export default function StatsGridExample() {
  return (
    <StatsGrid 
      referralsCount={12}
      referralEarnings={24.50}
      weeklyEarnings={70.00}
      daysActive={15}
    />
  );
}

import ReferralCard from '../ReferralCard';

export default function ReferralCardExample() {
  return (
    <ReferralCard
      referralCode="TAP2024XYZ"
      referralLink="https://tapapp.example.com/ref/TAP2024XYZ"
      totalReferrals={12}
      totalEarnings={24.50}
      commissionRate={20}
    />
  );
}

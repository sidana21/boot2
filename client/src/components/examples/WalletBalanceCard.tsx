import WalletBalanceCard from '../WalletBalanceCard';

export default function WalletBalanceCardExample() {
  return (
    <WalletBalanceCard 
      balanceUSDT={25.50} 
      balanceRTC={1000}
      todayEarnings={10.00} 
      totalEarnings={125.50}
      depositAmount={50}
    />
  );
}

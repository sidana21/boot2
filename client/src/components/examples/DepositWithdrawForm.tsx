import DepositWithdrawForm from '../DepositWithdrawForm';

export default function DepositWithdrawFormExample() {
  return (
    <DepositWithdrawForm
      currentBalance={25.50}
      minDeposit={5}
      minWithdraw={10}
      withdrawFee={0.5}
    />
  );
}

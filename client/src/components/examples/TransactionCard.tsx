import TransactionCard from '../TransactionCard';

export default function TransactionCardExample() {
  return (
    <div className="space-y-3 max-w-2xl">
      <TransactionCard
        type="tap"
        amount={10.00}
        status="completed"
        date="منذ ساعة"
        description="100 تكبيسة يومية"
      />
      <TransactionCard
        type="referral"
        amount={2.00}
        status="completed"
        date="منذ ساعتين"
        description="عمولة من أحمد"
      />
      <TransactionCard
        type="deposit"
        amount={5.00}
        status="completed"
        date="أمس"
      />
      <TransactionCard
        type="withdraw"
        amount={15.00}
        status="pending"
        date="قبل يومين"
      />
    </div>
  );
}

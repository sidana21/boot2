import { useState } from "react";
import TransactionCard, { TransactionType, TransactionStatus } from "@/components/TransactionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, MousePointer2, ArrowDownToLine, ArrowUpFromLine, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  date: string;
  description?: string;
}

// TODO: remove mock data - replace with real transaction data
const mockTransactions: Transaction[] = [
  { id: '1', type: 'tap', amount: 10.00, status: 'completed', date: 'منذ ساعة', description: '100 تكبيسة + 1000 RTC' },
  { id: '2', type: 'referral', amount: 2.00, status: 'completed', date: 'منذ ساعتين', description: 'عمولة من أحمد' },
  { id: '3', type: 'referral', amount: 1.50, status: 'completed', date: 'منذ 3 ساعات', description: 'عمولة من سارة' },
  { id: '4', type: 'deposit', amount: 5.00, status: 'completed', date: 'أمس' },
  { id: '5', type: 'withdraw', amount: 15.00, status: 'pending', date: 'قبل يومين' },
  { id: '6', type: 'tap', amount: 10.00, status: 'completed', date: 'قبل يومين', description: '100 تكبيسة + 1000 RTC' },
  { id: '7', type: 'referral', amount: 3.00, status: 'completed', date: 'قبل 3 أيام', description: 'عمولة من محمد' },
  { id: '8', type: 'deposit', amount: 10.00, status: 'completed', date: 'قبل أسبوع' },
];

export default function Transactions() {
  const [filter, setFilter] = useState<'all' | TransactionType>('all');

  const filteredTransactions = filter === 'all' 
    ? mockTransactions 
    : mockTransactions.filter(t => t.type === filter);

  const totalEarned = mockTransactions
    .filter(t => t.type === 'tap' || t.type === 'referral')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDeposited = mockTransactions
    .filter(t => t.type === 'deposit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-primary/10 pulse-soft">
          <History className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">المعاملات</h1>
          <p className="text-sm text-muted-foreground">سجل جميع المعاملات</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-background">
          <p className="text-sm text-muted-foreground mb-1">إجمالي الأرباح</p>
          <p className="text-3xl font-bold text-primary tabular-nums">+{totalEarned.toFixed(2)} USDT</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-accent/10 to-background">
          <p className="text-sm text-muted-foreground mb-1">إجمالي الإيداعات</p>
          <p className="text-3xl font-bold text-accent tabular-nums">{totalDeposited.toFixed(2)} USDT</p>
        </Card>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} dir="rtl">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" data-testid="filter-all" className="pulse-soft">الكل</TabsTrigger>
          <TabsTrigger value="tap" data-testid="filter-tap">
            <MousePointer2 className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="referral" data-testid="filter-referral">
            <Users className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="deposit" data-testid="filter-deposit">
            <ArrowDownToLine className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="withdraw" data-testid="filter-withdraw">
            <ArrowUpFromLine className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionCard key={transaction.id} {...transaction} />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>لا توجد معاملات</p>
          </div>
        )}
      </div>
    </div>
  );
}

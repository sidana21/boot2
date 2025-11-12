import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Deposit, Withdrawal, User } from "@shared/schema";
import TransactionCard, { TransactionType, TransactionStatus } from "@/components/TransactionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, MousePointer2, ArrowDownToLine, ArrowUpFromLine, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  date: string;
  description?: string;
}

export default function Transactions() {
  const [filter, setFilter] = useState<'all' | TransactionType>('all');

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ['/api/current-user'],
  });

  const { data: deposits = [], isLoading: depositsLoading } = useQuery<Deposit[]>({
    queryKey: ['/api/deposits'],
  });

  const { data: withdrawals = [], isLoading: withdrawalsLoading } = useQuery<Withdrawal[]>({
    queryKey: ['/api/withdrawals'],
  });

  const isLoading = userLoading || depositsLoading || withdrawalsLoading;

  const transactions: Transaction[] = [
    ...deposits.map(d => ({
      id: d.id,
      type: 'deposit' as TransactionType,
      amount: parseFloat(d.amount),
      status: d.status as TransactionStatus,
      date: new Date(d.createdAt).toLocaleDateString('ar'),
    })),
    ...withdrawals.map(w => ({
      id: w.id,
      type: 'withdraw' as TransactionType,
      amount: parseFloat(w.amount),
      status: w.status as TransactionStatus,
      date: new Date(w.createdAt).toLocaleDateString('ar'),
    })),
  ];

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  const totalEarned = parseFloat(user?.bonusWithdrawable || "0");
  const totalDeposited = deposits
    .filter(d => d.status === 'confirmed')
    .reduce((sum, d) => sum + parseFloat(d.amount), 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

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

import { Badge } from "@/components/ui/badge";
import { ArrowDownToLine, ArrowUpFromLine, MousePointer2, Users } from "lucide-react";

export type TransactionType = "tap" | "deposit" | "withdraw" | "referral";
export type TransactionStatus = "completed" | "pending" | "failed";

interface TransactionCardProps {
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  date: string;
  description?: string;
}

const typeConfig = {
  tap: {
    icon: MousePointer2,
    label: "تكبيس",
    color: "text-primary",
  },
  deposit: {
    icon: ArrowDownToLine,
    label: "إيداع",
    color: "text-accent",
  },
  withdraw: {
    icon: ArrowUpFromLine,
    label: "سحب",
    color: "text-destructive",
  },
  referral: {
    icon: Users,
    label: "إحالة",
    color: "text-primary",
  },
};

const statusConfig = {
  completed: { label: "مكتمل", variant: "default" as const },
  pending: { label: "قيد الانتظار", variant: "secondary" as const },
  failed: { label: "فشل", variant: "destructive" as const },
};

export default function TransactionCard({ type, amount, status, date, description }: TransactionCardProps) {
  const { icon: Icon, label, color } = typeConfig[type];
  const { label: statusLabel, variant } = statusConfig[status];
  const isPositive = type === "tap" || type === "deposit" || type === "referral";

  return (
    <div className="flex items-center justify-between p-4 rounded-lg hover-elevate border" data-testid={`transaction-${type}`}>
      <div className="flex items-center gap-3 flex-1">
        <div className={`p-2 rounded-full bg-muted ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{label}</p>
            <Badge variant={variant} className="text-xs">{statusLabel}</Badge>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground truncate">{description}</p>
          )}
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
      <div className="text-left">
        <p className={`text-lg font-bold tabular-nums ${isPositive ? 'text-primary' : 'text-destructive'}`}>
          {isPositive ? '+' : '-'}{amount.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground">USDT</p>
      </div>
    </div>
  );
}

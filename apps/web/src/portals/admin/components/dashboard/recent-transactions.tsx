import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/shared/utils/formatters";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  type: string;
  agent: string;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
  isLoading?: boolean;
}

export function RecentTransactions({
  transactions = [],
  isLoading = false,
}: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Latest transaction activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                      {transaction.agent.split(' ').map(part => part[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.agent}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCurrency(transaction.amount)}</p>
                  <Badge 
                    variant={
                      transaction.status === 'completed' ? 'default' : 
                      transaction.status === 'pending' ? 'secondary' : 'destructive'
                    }
                    className="mt-1"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-sm text-muted-foreground">No recent transactions</p>
          </div>
        )}
        
        {transactions.length > 0 && (
          <div className="mt-4 flex justify-center">
            <button className="text-xs text-primary hover:underline">
              View All Transactions
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

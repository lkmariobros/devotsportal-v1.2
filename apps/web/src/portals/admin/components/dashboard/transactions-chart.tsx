import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/shared/utils/formatters";

interface TransactionChartProps {
  data?: {
    labels: string[];
    values: number[];
  };
  totalTransactions?: number;
  completedTransactions?: number;
  isLoading?: boolean;
}

export function TransactionsChart({
  data = { labels: [], values: [] },
  totalTransactions = 0,
  completedTransactions = 0,
  isLoading = false,
}: TransactionChartProps) {
  // Calculate completion rate
  const completionRate = totalTransactions > 0 
    ? Math.round((completedTransactions / totalTransactions) * 100) 
    : 0;
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Transaction Overview</CardTitle>
        <CardDescription>
          Transaction volume and completion rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-muted-foreground">Total Transactions</p>
            <p className="text-xl font-bold mt-1">{totalTransactions}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-xl font-bold mt-1">{completedTransactions}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completion Rate</p>
            <p className="text-xl font-bold mt-1">{completionRate}%</p>
          </div>
        </div>
        
        {/* Chart placeholder - in a real app, you would use a chart library like Recharts */}
        <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center mb-4">
          {data.labels.length > 0 ? (
            <div className="w-full h-full p-4">
              <div className="flex h-full items-end justify-between gap-2">
                {data.values.map((value, index) => {
                  // Calculate height percentage based on max value
                  const maxValue = Math.max(...data.values);
                  const heightPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                  
                  return (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-8 bg-primary rounded-t-sm" 
                        style={{ height: `${heightPercentage}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{data.labels[index]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">No transaction data available</span>
          )}
        </div>
        
        <div className="flex justify-center">
          <button className="text-xs text-primary hover:underline">
            View Detailed Report
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

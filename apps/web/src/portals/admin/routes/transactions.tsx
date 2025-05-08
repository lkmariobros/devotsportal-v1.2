import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TabNavigation } from "../components/shared/tab-navigation";
import { EmptyState } from "../components/shared/empty-state";

import type { DateRange } from "@/shared/types/date-range";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { TransactionsChart } from "../components/dashboard/transactions-chart";
import { RecentTransactions } from "../components/dashboard/recent-transactions";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/admin/routes/transactions")({
  component: TransactionsPage,
});

export function TransactionsPage() {
  // State for tab navigation
  const [activeTab, setActiveTab] = useState("all");

  // State for date range picker
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Fetch transaction data with tRPC
  const { data, isLoading } = trpc.dashboard.getTransactions.useQuery(
    { status: activeTab === "all" ? undefined : activeTab as any },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Format transaction data for the recent transactions component
  const recentTransactions = data?.recentTransactions.map((tx: any) => ({
    id: tx.id,
    date: tx.transaction_date,
    amount: tx.transaction_value,
    status: tx.status as 'pending' | 'completed' | 'cancelled',
    type: tx.transaction_types[0]?.name || 'Unknown',
    agent: `${tx.profiles[0]?.first_name || ''} ${tx.profiles[0]?.last_name || ''}`.trim() || 'Unknown Agent'
  })) || [];

  // Calculate transaction statistics
  const totalTransactions = (data?.transactionCounts.active || 0) +
                           (data?.transactionCounts.completed || 0);
  const completedTransactions = data?.transactionCounts.completed || 0;

  // Update tab labels with counts
  const tabs = [
    { id: "all", label: `All (${totalTransactions})` },
    { id: "pending", label: `Pending (${data?.statusCounts.find((s: any) => s.status === 'pending')?.count || 0})` },
    { id: "completed", label: `Completed (${data?.statusCounts.find((s: any) => s.status === 'completed')?.count || 0})` },
    { id: "cancelled", label: `Cancelled (${data?.statusCounts.find((s: any) => s.status === 'cancelled')?.count || 0})` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">View and manage property transactions</p>
        </div>
        <DatePicker value={dateRange} onChange={setDateRange} />
      </div>

      <Card>
        <CardHeader className="pb-0">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </CardHeader>

        <CardContent className="pt-6">
          {recentTransactions.length > 0 ? (
            <div className="space-y-6">
              {/* Transaction Chart */}
              <TransactionsChart
                data={{
                  labels: data?.chartData.transactions.labels || [],
                  values: data?.chartData.transactions.values || []
                }}
                totalTransactions={totalTransactions}
                completedTransactions={completedTransactions}
                isLoading={isLoading}
              />

              {/* Recent Transactions */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">
                  {activeTab === "all" ? "All" : activeTab === "pending" ? "Pending" :
                   activeTab === "completed" ? "Completed" : "Cancelled"} Transactions
                </h2>

                <RecentTransactions
                  transactions={recentTransactions.filter((tx: any) =>
                    activeTab === "all" || tx.status === activeTab
                  )}
                  isLoading={isLoading}
                />
              </div>
            </div>
          ) : (
            <EmptyState
              title="No transactions found"
              description="There are no transactions in the system yet."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import type { DateRange } from "@/shared/types/date-range";
import { RiDownloadLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { DashboardStats } from "../components/dashboard/dashboard-stats";
import { TransactionsChart } from "../components/dashboard/transactions-chart";
import { CommissionForecastChart } from "../components/dashboard/commission-forecast-chart";
import { RecentTransactions } from "../components/dashboard/recent-transactions";
import { useDashboardData } from "../services/dashboard-service";

export const Route = createFileRoute("/admin/routes/")({
  component: DashboardPage,
});

export function DashboardPage() {
  // State for date range picker
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Fetch dashboard data with date range
  const { data: dashboardData, isLoading } = useDashboardData(dateRange);

  // Handle export data
  const handleExportData = () => {
    // In a real app, this would trigger a data export
    console.log("Exporting data for range:", dateRange);
  };

  // Format transaction data for the recent transactions component
  const recentTransactions = dashboardData?.transactions.recentTransactions.map((tx: any) => ({
    id: tx.id,
    date: tx.transaction_date,
    amount: tx.transaction_value,
    status: tx.status as 'pending' | 'completed' | 'cancelled',
    type: tx.transaction_types[0]?.name || 'Unknown',
    agent: `${tx.profiles[0]?.first_name || ''} ${tx.profiles[0]?.last_name || ''}`.trim() || 'Unknown Agent'
  })) || [];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <DatePicker value={dateRange} onChange={setDateRange} />
          <Button onClick={handleExportData}>
            <RiDownloadLine className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats
        agentCount={dashboardData?.agents.totalCount || 0}
        agentChange={dashboardData?.agents.agentChange || 0}
        activeTransactions={dashboardData?.transactions.transactionCounts.active || 0}
        transactionChange={5.2} // Example value
        revenue={dashboardData?.transactions.revenue || 0}
        revenueChange={dashboardData?.transactions.revenueChange || 0}
        pendingCommissions={dashboardData?.transactions.avgCommission * 3 || 0} // Example calculation
        commissionChange={dashboardData?.transactions.commissionChange || 0}
        isLoading={isLoading}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <TransactionsChart
          data={{
            labels: dashboardData?.chartData.transactions.labels || [],
            values: dashboardData?.chartData.transactions.values || []
          }}
          totalTransactions={(dashboardData?.transactions.transactionCounts.active || 0) +
                             (dashboardData?.transactions.transactionCounts.completed || 0)}
          completedTransactions={dashboardData?.transactions.transactionCounts.completed || 0}
          isLoading={isLoading}
        />

        <CommissionForecastChart
          historicalTotal={7500} // Example values
          monthlyAverage={1250}
          forecastTotal={3500}
          data={{
            labels: dashboardData?.chartData.commissions.labels || [],
            historical: dashboardData?.chartData.commissions.historical || [],
            forecast: dashboardData?.chartData.commissions.forecast || []
          }}
          isLoading={isLoading}
        />
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <RecentTransactions
          transactions={recentTransactions}
          isLoading={isLoading}
        />

        {/* This could be another component like upcoming payments or agent performance */}
        <div className="col-span-1 md:col-span-3">
          {/* Additional dashboard content can go here */}
        </div>
      </div>
    </div>
  );
}

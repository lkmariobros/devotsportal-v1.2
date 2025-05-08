import { trpc } from "@/utils/trpc";

import type { DateRange } from "@/shared/types/date-range";

// Types for dashboard data
export interface AgentData {
  agents: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    team_id: string;
    created_at: string;
    team: string;
    teams?: { name: string }[];
  }[];
  totalCount: number;
  agentChange?: number | null;
}

export interface TransactionData {
  statusCounts: { status: string; count: number }[];
  recentTransactions: {
    id: string;
    transaction_date: string;
    transaction_value: number;
    status: string;
    transaction_types: { name: string }[];
    profiles: { first_name: string; last_name: string }[];
  }[];
  upcomingPayments: Array<{
    agent_name: string;
    payment_date: string;
    amount: number;
  }>;
  transactionCounts: { active: number; completed: number };
  revenue: number;
  avgCommission: number;
  revenueChange?: number;
  commissionChange?: number;
}

// Fallback mock data in case the API is not available
const fallbackData = {
  agents: {
    totalCount: 24,
    agentChange: 8.5,
    agents: Array(5).fill(null).map((_, i) => ({
      id: `agent-${i}`,
      first_name: `Agent`,
      last_name: `${i + 1}`,
      email: `agent${i + 1}@example.com`,
      status: i % 3 === 0 ? 'inactive' : 'active',
      team_id: `team-${i % 3}`,
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      team: `Team ${i % 3 + 1}`,
      teams: [{ name: `Team ${i % 3 + 1}` }]
    }))
  },
  transactions: {
    statusCounts: [
      { status: 'pending', count: 12 },
      { status: 'completed', count: 45 },
      { status: 'cancelled', count: 3 }
    ],
    recentTransactions: Array(5).fill(null).map((_, i) => ({
      id: `tx-${i}`,
      transaction_date: new Date(Date.now() - i * 86400000).toISOString(),
      transaction_value: 1000 + (i * 500),
      status: i % 3 === 0 ? 'pending' : i % 3 === 1 ? 'completed' : 'cancelled',
      transaction_types: [{ name: i % 2 === 0 ? 'Sale' : 'Commission' }],
      profiles: [{ first_name: `Agent`, last_name: `${i + 1}` }]
    })),
    upcomingPayments: Array(3).fill(null).map((_, i) => ({
      agent_name: `Agent ${i + 1}`,
      payment_date: new Date(Date.now() + (i + 1) * 86400000).toISOString(),
      amount: 500 + (i * 250)
    })),
    transactionCounts: { active: 12, completed: 45 },
    revenue: 75000,
    avgCommission: 2500,
    revenueChange: 12.3,
    commissionChange: 5.7
  },
  chartData: {
    transactions: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [12, 19, 15, 22, 30, 28]
    },
    commissions: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      historical: [1500, 2200, 1800, 2500, 3000, 2800],
      forecast: [0, 0, 0, 0, 0, 0, 3200, 3500]
    }
  }
};

// Custom hook for fetching dashboard data using tRPC
export function useDashboardData(dateRange?: DateRange) {
  // Convert DateRange to string format for the API
  const startDate = dateRange?.from ? dateRange.from.toISOString() : undefined;
  const endDate = dateRange?.to ? dateRange.to.toISOString() : undefined;

  // Use tRPC to fetch dashboard data
  const { data, isLoading, isError, error } = trpc.dashboard.getSummary.useQuery(
    { startDate, endDate },
    {
      // Only refetch when the date range changes
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Use fallback data if the query fails
      placeholderData: fallbackData,
      // Retry failed queries
      retry: 1,
    }
  );

  return {
    data: data || fallbackData,
    isLoading,
    isError,
    error
  };
}

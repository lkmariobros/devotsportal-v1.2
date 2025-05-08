import { z } from "zod";
import { router, protectedProcedure } from "../lib/trpc";
import type { Context } from "../lib/context";

// Mock data for dashboard - in a real app, this would come from your database
const mockDashboardData = {
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

export const dashboardRouter = router({
  getSummary: protectedProcedure
    .input(z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional()
    }).optional())
    .query(async ({ ctx, input }: { ctx: Context; input?: { startDate?: string; endDate?: string } }) => {
      // Note: ctx and input are unused in this mock implementation but would be used in a real app
      // In a real app, you would fetch data from your database based on the date range
      // For example:
      // const { startDate, endDate } = input || {};
      // const transactions = await ctx.db.query.transactions.findMany({
      //   where: startDate && endDate ? {
      //     transaction_date: {
      //       gte: new Date(startDate),
      //       lte: new Date(endDate)
      //     }
      //   } : undefined,
      //   include: {
      //     transaction_types: true,
      //     profiles: true
      //   }
      // });

      // For now, we'll just return the mock data
      return mockDashboardData;
    }),

  getAgents: protectedProcedure
    .query(async ({ ctx }: { ctx: Context }) => {
      // Note: ctx is unused in this mock implementation but would be used in a real app
      // In a real app, fetch from database
      return mockDashboardData.agents;
    }),

  getTransactions: protectedProcedure
    .input(z.object({
      status: z.enum(['all', 'pending', 'completed', 'cancelled']).optional(),
      limit: z.number().min(1).max(100).optional()
    }).optional())
    .query(async ({ ctx, input }: { ctx: Context; input?: { status?: string; limit?: number } }) => {
      // Note: ctx and input are unused in this mock implementation but would be used in a real app
      // In a real app, filter by status and limit
      return mockDashboardData.transactions;
    })
});

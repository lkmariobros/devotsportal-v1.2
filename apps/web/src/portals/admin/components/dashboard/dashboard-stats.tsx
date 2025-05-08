import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatPercentage, getChangeType } from "@/shared/utils/formatters";

interface StatCardProps {
  title: string;
  value: string;
  change?: number | null;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  const changeType = getChangeType(change);

  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>

            {change !== undefined && change !== null && (
              <div className="flex items-center mt-2">
                <span className={`inline-flex items-center text-xs ${
                  changeType === 'positive' ? 'text-emerald-500' :
                  changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {changeType === 'positive' && <RiArrowUpLine className="mr-1 h-3 w-3" />}
                  {changeType === 'negative' && <RiArrowDownLine className="mr-1 h-3 w-3" />}
                  {formatPercentage(Math.abs(change))} vs last period
                </span>
              </div>
            )}
          </div>

          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  agentCount?: number;
  agentChange?: number | null;
  activeTransactions?: number;
  transactionChange?: number | null;
  revenue?: number;
  revenueChange?: number | null;
  pendingCommissions?: number;
  commissionChange?: number | null;
  isLoading?: boolean;
}

export function DashboardStats({
  agentCount = 0,
  agentChange = 0,
  activeTransactions = 0,
  transactionChange = 0,
  revenue = 0,
  revenueChange = 0,
  pendingCommissions = 0,
  commissionChange = 0,
  isLoading = false,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="TOTAL AGENTS"
        value={agentCount.toString()}
        change={agentChange}
        icon={<RiUserLine className="h-5 w-5" />}
      />
      <StatCard
        title="ACTIVE TRANSACTIONS"
        value={activeTransactions.toString()}
        change={transactionChange}
        icon={<RiExchangeLine className="h-5 w-5" />}
      />
      <StatCard
        title="MONTHLY REVENUE"
        value={formatCurrency(revenue)}
        change={revenueChange}
        icon={<RiMoneyDollarCircleLine className="h-5 w-5" />}
      />
      <StatCard
        title="PENDING COMMISSIONS"
        value={formatCurrency(pendingCommissions)}
        change={commissionChange}
        icon={<RiWalletLine className="h-5 w-5" />}
      />
    </div>
  );
}

// Import these icons from @remixicon/react
function RiUserLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 0 0-12 0H4Zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6Zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"/>
    </svg>
  );
}

function RiExchangeLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-5-7h9v2h-4v3l-5-5Zm5-4V6l5 5H8V9h4Z"/>
    </svg>
  );
}

function RiMoneyDollarCircleLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-3.5-6H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2Z"/>
    </svg>
  );
}

function RiWalletLine(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M18 7h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h15v4ZM4 9v10h16V9H4Zm0-4v2h12V5H4Zm11 8h3v2h-3v-2Z"/>
    </svg>
  );
}
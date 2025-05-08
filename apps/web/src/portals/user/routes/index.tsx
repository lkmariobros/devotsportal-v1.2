import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import type { DateRange } from "@/shared/types/date-range";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/shared/utils/formatters";

export const Route = createFileRoute("/user/routes/")({
  component: AgentDashboard,
});

export function AgentDashboard() {
  // State for date range picker
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <DatePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Agent Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Active Transactions" value="3" />
        <StatCard title="Pending Commissions" value={formatCurrency(2500)} />
        <StatCard title="Completed This Month" value="7" />
        <StatCard title="Total Earnings" value={formatCurrency(12500)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    task.priority === 'high'
                      ? 'bg-red-500'
                      : task.priority === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{task.title}</h3>
                    <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium mr-3">
                    {message.sender.split(' ').map(part => part[0]).join('').toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">{message.sender}</h3>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{message.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingPayments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(payment.amount)}</p>
                  <p className="text-xs text-muted-foreground">{payment.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Simple stat card component
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}

// Sample data
const tasks = [
  { id: 1, title: "Complete monthly report", priority: "high", dueDate: "Today" },
  { id: 2, title: "Client follow-up call", priority: "medium", dueDate: "Tomorrow" },
  { id: 3, title: "Update documentation", priority: "low", dueDate: "Next week" },
  { id: 4, title: "Team meeting preparation", priority: "medium", dueDate: "Today" },
];

const messages = [
  { id: 1, sender: "John Doe", preview: "Can you please review the latest...", time: "10:30 AM" },
  { id: 2, sender: "Jane Smith", preview: "The client meeting is scheduled for...", time: "Yesterday" },
  { id: 3, sender: "Bob Johnson", preview: "I've updated the project timeline...", time: "Yesterday" },
  { id: 4, sender: "Alice Brown", preview: "Please check the new requirements...", time: "2 days ago" },
];

const upcomingPayments = [
  { description: "Commission - Property Sale", amount: 1500, dueDate: "May 15, 2023", status: "Processing" },
  { description: "Referral Bonus", amount: 500, dueDate: "May 20, 2023", status: "Scheduled" },
  { description: "Commission - Rental Agreement", amount: 750, dueDate: "May 25, 2023", status: "Pending Approval" },
];

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/routes/users")({
  component: UsersPage,
});

export function UsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>

      <div className="border rounded-lg bg-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-semibold">All Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Email</th>
                <th className="text-left p-3 font-medium">Role</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-sm text-primary hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Sample data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Agent", status: "active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Agent", status: "inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Agent", status: "active" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Admin", status: "active" },
];

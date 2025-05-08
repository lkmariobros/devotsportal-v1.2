import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "../components/layout/admin-layout";

// Define the component first to avoid circular reference
function AdminRoot() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

// Then create the route
// @ts-ignore - Suppress the circular reference error
export const Route = createFileRoute("/admin/routes/__root")({
  component: AdminRoot,
});

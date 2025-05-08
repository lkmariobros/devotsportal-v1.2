import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { AdminLayout } from "../../portals/admin/components/layout/admin-layout";

// Define the AdminRoot component first to avoid circular reference
function AdminRoot() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

// Then create the route
// @ts-ignore - Suppress the circular reference error
export const Route = createFileRoute("/admin/__root")({
  component: AdminRoot,
});

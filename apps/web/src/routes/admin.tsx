import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout as AdminPortalLayout } from "../portals/admin/components/layout/admin-layout";
import { Outlet } from "@tanstack/react-router";

// Define the AdminRoot component first to avoid circular reference
function AdminRoot() {
  return (
    <AdminPortalLayout>
      <Outlet />
    </AdminPortalLayout>
  );
}

// Then create the route
// @ts-ignore - Suppress the circular reference error
export const Route = createFileRoute("/admin")({
  component: AdminRoot,
});

// Original AdminLayout is now removed

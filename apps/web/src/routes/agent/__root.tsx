import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { UserLayout } from "../../portals/user/components/user-layout";

// Define the UserRoot component first to avoid circular reference
function UserRoot() {
  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
}

// Then create the route
// @ts-ignore - Suppress the circular reference error
export const Route = createFileRoute("/agent/__root")({
  component: UserRoot,
});

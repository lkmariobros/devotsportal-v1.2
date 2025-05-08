import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { UserLayout } from "../components/user-layout";
import type { RouterAppContext } from "@/shared/types";

// Define the component first to avoid circular reference
function UserRoot() {
  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
}

// @ts-ignore - Suppress the circular reference error
export const Route = createFileRoute("/user/routes/__root")({
  component: UserRoot,
  path: "agent",
});

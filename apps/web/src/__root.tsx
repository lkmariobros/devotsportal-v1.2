import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import type { trpc } from "@/utils/trpc";

// Define the context type for the router
export interface RouterAppContext {
  queryClient: QueryClient;
  trpc: typeof trpc;
}

// Create the root route
export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
});

// Root component that renders the outlet
function RootComponent() {
  return <Outlet />;
}

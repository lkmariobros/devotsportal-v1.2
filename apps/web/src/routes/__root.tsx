import { Toaster } from "sonner";
import type { RouterAppContext } from "@/shared/types";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  beforeLoad: ({ location }) => {
    // If user is at the root path, redirect to the appropriate portal
    // In a real app, you would check user permissions/role here
    if (location.pathname === "/") {
      // For demo purposes, redirect to admin portal
      // In a real app, you would check user role and redirect accordingly
      return redirect({
        to: "/admin",
      });
    }
  },
  head: () => ({
    meta: [
      {
        title: "Devots Portal",
      },
      {
        name: "description",
        content: "Devots Portal - Admin and User Portals",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <Toaster richColors />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
    </>
  );
}

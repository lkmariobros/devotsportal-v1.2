import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "../../portals/admin/routes/index";

// @ts-ignore - Suppress the circular reference error
export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

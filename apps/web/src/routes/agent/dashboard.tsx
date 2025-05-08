import { createFileRoute } from "@tanstack/react-router";
import { AgentDashboard } from "../../portals/user/routes/index";

// @ts-ignore - Suppress the circular reference error
export const Route = createFileRoute("/agent/dashboard")({
  component: AgentDashboard,
});

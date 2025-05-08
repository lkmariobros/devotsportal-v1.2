import { createFileRoute } from "@tanstack/react-router";
import { UsersPage } from "../../portals/admin/routes/users";

// @ts-ignore - Suppress the circular reference error
export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

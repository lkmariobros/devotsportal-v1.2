import { createFileRoute } from "@tanstack/react-router";
import { TransactionsPage } from "../../portals/admin/routes/transactions";

// @ts-ignore - Suppress the circular reference error
export const Route = createFileRoute("/admin/transactions")({
  component: TransactionsPage,
});

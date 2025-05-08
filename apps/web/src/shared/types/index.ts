import type { QueryClient } from "@tanstack/react-query";
import type { trpc } from "@/utils/trpc";

export interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
}

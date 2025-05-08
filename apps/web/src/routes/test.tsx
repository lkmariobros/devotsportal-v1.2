import { createFileRoute } from "@tanstack/react-router";

// This is a dummy file to fix the import error in routeTree.gen.ts
// It will be removed by the Tanstack Router plugin when it regenerates the route tree
export const Route = createFileRoute("/test")({
  component: () => null,
});

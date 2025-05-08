// @ts-check

/**
 * This file configures the TanStack Router plugin.
 * It tells the router which directories to scan for route files.
 */
module.exports = {
  routesDirectory: "./src/portals",
  generatedRouteTree: "./src/routeTree.gen.ts",
  // Include both the main routes and the portal routes
  routeFileIgnorePattern: ["**/*.test.*", "**/__tests__/**/*"],
};

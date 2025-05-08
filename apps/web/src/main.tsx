import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, trpc } from "@/utils/trpc";

// Initialize theme - super simple version
(function initTheme() {
  try {
    // Default to dark theme
    let theme = "dark";

    // Try to get from localStorage
    try {
      const savedTheme = localStorage.getItem("vite-ui-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        theme = savedTheme;
      }
    } catch (e) {
      console.error("Could not access localStorage", e);
    }

    // Apply theme to document
    document.documentElement.classList.add(theme);
  } catch (e) {
    console.error("Could not initialize theme", e);
  }
})();

// Create the router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPendingComponent: () => <Loader />,
  defaultErrorComponent: ({ error }) => (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 border rounded-lg bg-card max-w-md">
        <h1 className="text-2xl font-bold text-destructive mb-2">Error</h1>
        <p className="text-muted-foreground mb-4">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={() => window.location.href = "/"}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Go Home
        </button>
      </div>
    </div>
  ),
  context: { trpc, queryClient },
  Wrap: function WrapComponent({ children }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Initialize the application
function initApp() {
  const rootElement = document.getElementById("app");
  if (!rootElement) throw new Error("Root element not found");

  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<RouterProvider router={router} />);
  }
}

// Start the application
initApp();

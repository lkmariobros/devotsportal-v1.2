import { useRouterState } from "@tanstack/react-router";

export function Header() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Extract the current section from the path
  const pathParts = currentPath.split('/').filter(Boolean);
  const currentSection = pathParts.length > 1 ? pathParts[1] : 'Dashboard';

  return (
    <header className="h-16 border-b border-sidebar-border flex items-center px-6 justify-between bg-sidebar-background">
      <div className="flex items-center gap-2">
        <button className="w-6 h-6 text-muted-foreground">
          <MenuIcon />
        </button>
        <button className="w-6 h-6 text-muted-foreground ml-2">
          <RefreshIcon />
        </button>
        <div className="h-6 border-r border-sidebar-border mx-3"></div>
        <span className="text-sm text-muted-foreground">Admin</span>
        <span className="text-sm text-muted-foreground mx-1">/</span>
        <span className="text-sm capitalize text-sidebar-foreground">{currentSection}</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm text-muted-foreground hover:text-sidebar-foreground">
          Feedback
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary text-xs">AU</span>
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return <div className="w-5 h-5 bg-current opacity-70" />;
}

function RefreshIcon() {
  return <div className="w-5 h-5 bg-current opacity-70 rounded-full" />;
}

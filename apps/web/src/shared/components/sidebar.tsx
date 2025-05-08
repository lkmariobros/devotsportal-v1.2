import { Link } from "@tanstack/react-router";
import { cn } from "@/shared/utils/cn";

type SidebarItem = {
  label: string;
  href: string;
  icon: string;
};

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

export function Sidebar({ items, className }: SidebarProps) {
  return (
    <aside className={cn("w-64 bg-card border-r border-border h-full", className)}>
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold">Devots Portal</h1>
      </div>
      
      {/* Navigation */}
      <nav className="p-2">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={({ isActive }) => 
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted"
                  )
                }
                activeProps={{
                  className: "bg-primary/10 text-primary"
                }}
              >
                <span className="w-5 h-5">{renderIcon(item.icon)}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

// Simple function to render icons based on name
// In a real app, you would use a proper icon library
function renderIcon(name: string) {
  // This is a placeholder - in a real app you would use actual icons
  return <div className="w-5 h-5 bg-current opacity-70 rounded-sm" />;
}

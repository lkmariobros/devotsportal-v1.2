import { Link } from "@tanstack/react-router";

const navItems = [
  { icon: "dashboard", label: "Dashboard", href: "/admin", active: true },
  { icon: "transactions", label: "Transactions", href: "/admin/transactions" },
  { icon: "users", label: "Agent Management", href: "/admin/agents", hasChildren: true },
];

const otherItems = [
  { icon: "settings", label: "Admin Management", href: "/admin/management" },
  { icon: "settings", label: "Settings", href: "/admin/settings" },
  { icon: "help", label: "Help Center", href: "/admin/help" },
];

export function Sidebar() {
  return (
    <div data-sidebar="sidebar" className="w-[var(--sidebar-width)] h-screen flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm">A</span>
        </div>
        <h1 className="font-semibold text-sidebar-foreground">Admin Dashboard</h1>
      </div>

      {/* Search */}
      <div className="px-4 mt-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-sidebar-accent rounded-md py-1.5 px-3 text-sm text-sidebar-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="absolute right-2 top-1.5 text-muted-foreground">
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex-1">
        <div className="px-4 mb-2">
          <h2 className="text-xs font-medium text-muted-foreground uppercase">Sections</h2>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={item.active}
              hasChildren={item.hasChildren}
            />
          ))}
        </nav>

        <div className="px-4 mt-6 mb-2">
          <h2 className="text-xs font-medium text-muted-foreground uppercase">Other</h2>
        </div>

        <nav className="space-y-1">
          {otherItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          ))}
        </nav>
      </div>

      {/* Sign Out */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 text-muted-foreground hover:text-sidebar-foreground w-full">
          <LogoutIcon className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  hasChildren?: boolean;
}

function NavItem({ icon, label, href, active, hasChildren }: NavItemProps) {
  return (
    <Link
      to={href}
      className={`flex items-center justify-between px-4 py-2 text-sm ${
        active
          ? "bg-primary/10 text-primary border-l-2 border-primary"
          : "text-muted-foreground hover:text-sidebar-foreground"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 flex items-center justify-center">
          <IconComponent name={icon} />
        </span>
        <span>{label}</span>
      </div>

      {hasChildren && (
        <ChevronDownIcon className="w-4 h-4" />
      )}
    </Link>
  );
}

// Placeholder for icons
function IconComponent({ name }: { name: string }) {
  return <div className="w-4 h-4 bg-current opacity-70 rounded-sm" />;
}

function SearchIcon() {
  return <div className="w-4 h-4 bg-current opacity-70 rounded-full" />;
}

function LogoutIcon({ className }: { className?: string }) {
  return <div className={`w-4 h-4 bg-current opacity-70 ${className}`} />;
}

function ChevronDownIcon({ className }: { className?: string }) {
  return <div className={`w-4 h-4 bg-current opacity-70 ${className}`} />;
}

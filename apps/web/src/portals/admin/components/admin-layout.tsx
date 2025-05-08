import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#1A1A1A] h-screen flex flex-col border-r border-[#2A2A2A]">
        {/* Logo */}
        <div className="p-4 border-b border-[#2A2A2A] flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-white text-sm">A</span>
          </div>
          <h1 className="font-semibold text-white">Admin Portal</h1>
        </div>

        {/* Navigation */}
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <a
                href="/admin"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm bg-emerald-600/10 text-emerald-500 border-l-2 border-emerald-500"
              >
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/users"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white"
              >
                <span>Users</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white"
              >
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 border-b border-[#2A2A2A] flex items-center px-6 justify-between bg-[#1A1A1A]">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Admin User</span>
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="text-white text-xs">AU</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

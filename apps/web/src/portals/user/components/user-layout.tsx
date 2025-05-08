import { Sidebar } from "@/shared/components/sidebar";
import { Header } from "@/shared/components/header";
import { Avatar } from "@/shared/components/avatar";
import { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        items={[
          { label: "Dashboard", href: "/agent", icon: "dashboard" },
          { label: "Tasks", href: "/agent/tasks", icon: "tasks" },
          { label: "Messages", href: "/agent/messages", icon: "messages" },
          { label: "Profile", href: "/agent/profile", icon: "profile" },
        ]} 
      />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header>
          <div className="ml-auto flex items-center gap-4">
            <Avatar 
              name="Agent User"
              email="agent@example.com"
              role="Agent"
            />
          </div>
        </Header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

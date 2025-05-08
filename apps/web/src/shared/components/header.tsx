import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <header className={cn("h-16 border-b border-border flex items-center px-6", className)}>
      {children}
    </header>
  );
}

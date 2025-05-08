import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Super simple theme toggle button without any React state or hooks
export function ModeToggle() {
  // Simple function to toggle between light and dark
  function toggleTheme() {
    try {
      const root = document.documentElement;
      const isDark = root.classList.contains("dark");

      // Toggle the theme
      root.classList.remove(isDark ? "dark" : "light");
      root.classList.add(isDark ? "light" : "dark");

      // Save to localStorage
      localStorage.setItem("vite-ui-theme", isDark ? "light" : "dark");
    } catch (e) {
      console.error("Error toggling theme", e);
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}

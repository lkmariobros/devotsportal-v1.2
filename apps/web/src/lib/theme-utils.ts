/**
 * Theme utilities for the application
 */

// Define the theme types
export type Theme = "dark" | "light" | "system";

// Storage key for the theme
const STORAGE_KEY = "vite-ui-theme";

/**
 * Get the current theme from localStorage
 */
export function getTheme(): Theme {
  if (typeof window === "undefined") return "system";

  try {
    const theme = localStorage.getItem(STORAGE_KEY);
    if (theme === "dark" || theme === "light" || theme === "system") {
      return theme;
    }
  } catch (e) {
    console.error("Error accessing localStorage", e);
  }

  return "system";
}

/**
 * Apply the theme to the document
 */
export function applyTheme(theme: Theme = getTheme()): void {
  if (typeof window === "undefined") return;

  try {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  } catch (e) {
    console.error("Error applying theme", e);
  }
}

/**
 * Set the theme and save it to localStorage
 */
export function setTheme(theme: Theme): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  } catch (e) {
    console.error("Error setting theme", e);
  }
}

// Initialize theme on load
if (typeof window !== "undefined") {
  // Apply theme immediately if DOM is ready
  if (document.readyState !== "loading") {
    applyTheme();
  } else {
    document.addEventListener("DOMContentLoaded", () => applyTheme());
  }
}

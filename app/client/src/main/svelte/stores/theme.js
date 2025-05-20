import { writable } from "svelte/store";

// Get the user's preferred color scheme from the system
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Get stored theme from localStorage or use system preference as default
const THEME_KEY = "petclinic_theme";
const storedTheme = localStorage.getItem(THEME_KEY);
const defaultTheme = storedTheme || (prefersDarkMode ? "dark" : "light");

// Create a writable store with the default theme
export const theme = writable(defaultTheme);

// Subscribe to theme changes and update localStorage
theme.subscribe((value) => {
  if (typeof value === "string") {
    localStorage.setItem(THEME_KEY, value);
    
    // Apply or remove the 'dark' class on the document element
    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
});

// Toggle between light and dark themes
export function toggleTheme() {
  theme.update(currentTheme => currentTheme === "light" ? "dark" : "light");
}

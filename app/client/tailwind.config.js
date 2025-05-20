import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";
export default {
  mode: "jit",
  darkMode: 'class',
  content: ["./src/**/*.{html,svelte,js,ts}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primary: {
          50: "#f1f8ff",
          100: "#dbedff",
          200: "#c8e1ff",
          300: "#79b8ff",
          400: "#2188ff",
          500: "#0366d6", // GitHub primary blue
          600: "#005cc5",
          700: "#044289",
          800: "#032f62",
          900: "#05264c",
        },
        github: {
          // Light mode colors
          bg: "#f6f8fa",       // GitHub background
          border: "#e1e4e8",   // GitHub border color
          header: "#24292e",   // GitHub header
          text: "#24292e",     // GitHub text
          link: "#0366d6",     // GitHub link
          hover: "#f6f8fa",    // GitHub hover background
          success: "#2ea44f",  // GitHub success/green
          danger: "#cb2431",   // GitHub danger/red
          warning: "#f9c513",  // GitHub warning/yellow
          gray: "#6a737d",     // GitHub gray text

          // Dark mode colors
          darkBg: "#0d1117",       // GitHub dark background
          darkBorder: "#30363d",   // GitHub dark border color
          darkHeader: "#161b22",   // GitHub dark header
          darkText: "#c9d1d9",     // GitHub dark text
          darkLink: "#58a6ff",     // GitHub dark link
          darkHover: "#161b22",    // GitHub dark hover background
          darkSuccess: "#2ea043",  // GitHub dark success/green
          darkDanger: "#f85149",   // GitHub dark danger/red
          darkWarning: "#e3b341",  // GitHub dark warning/yellow
          darkGray: "#8b949e",     // GitHub dark gray text

          // Additional dark mode colors for components
          darkInput: "#0d1117",    // Dark input background
          darkSelect: "#0d1117",   // Dark select background
          darkCard: "#161b22",     // Dark card background
          darkBorder2: "#21262d",  // Lighter dark border
        },
        title: colors.gray,
        label: colors.gray,
        error: colors.red,
      },
      width: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
      },
    },
    fontSize: {
      base: "1rem",
      "5xl": "6rem",
      "4xl": "3.75rem",
      "3xl": "3rem",
      "2xl": "2.125rem",
      xl: "1.5rem",
      lg: "1.25rem",
      sm: "0.875rem",
      xs: "0.75rem",
    },
    breakpoints: {
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
  },
  plugins: [forms],
};

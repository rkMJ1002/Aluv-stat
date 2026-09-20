import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#121316",
        "slate-graphite": "#24272E",
        "slate-secondary": "#4A505C",
        aluminum: "#E2E4E8",
        "aluminum-tint": "#F8F9FA",
        "aluminum-secondary": "#C0C4CC",
        "pure-white": "#FFFFFF",
        "muted-blush": "#E8B4B8",
        champagne: "#D8D4CE",
        "dark-slate": "#1A1C20",
        "dark-border": "#2E323B",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        heading: ["'Outfit'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "4px",
        md: "4px",
        lg: "4px",
        xl: "4px",
        "2xl": "4px",
      },
      boxShadow: {
        "hard-light": "2px 2px 0px #121316",
        "hard-dark": "2px 2px 0px #FFFFFF",
        "hard-aluminum": "2px 2px 0px #E2E4E8",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";
import { THEME } from "./lib/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: THEME.colors.primary,
          secondary: THEME.colors.secondary,
          text: THEME.colors.text,
          background: THEME.colors.background,
          muted: THEME.colors.muted,
          blush: THEME.colors.blush,
          accent: THEME.colors.accent,
        },
        graphite: {
          900: "#1A1A1A",
          800: "#2B2B2B",
          700: "#3D3D3D",
          600: "#4F4F4F",
          500: "#616161",
          400: "#7B7B7B",
          300: "#9B9B9B",
          200: "#BEBEBE",
          100: "#E4E4E4",
        },
      },
      fontFamily: {
        heading: ["var(--font-body)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.035em",
      },
      transitionTimingFunction: {
        curtain: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

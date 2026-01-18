import type { Config } from "tailwindcss";
import { THEME } from "./lib/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

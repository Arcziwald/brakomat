import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1e2d4a",
          50: "#f0f4fb",
          100: "#dde6f4",
          200: "#c0cfeb",
          300: "#94aedd",
          400: "#6285cb",
          500: "#4066ba",
          600: "#2f50a0",
          700: "#2a4082",
          800: "#253766",
          900: "#1e2d4a",
          950: "#141e32",
        },
        accent: {
          DEFAULT: "#38bdf8",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

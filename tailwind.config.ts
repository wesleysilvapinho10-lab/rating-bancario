import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b8dbff",
          300: "#86c2ff",
          400: "#4ba0ff",
          500: "#1f7dff",
          600: "#0c5fe0",
          700: "#0a4ab3",
          800: "#0d3c8c",
          900: "#0f346f",
          950: "#0a1f47",
        },
        success: {
          500: "#16a34a",
          600: "#15803d",
        },
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(15, 52, 111, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "grow-bar": "growBar 1.2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        growBar: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

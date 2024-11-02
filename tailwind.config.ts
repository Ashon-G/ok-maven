import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "hsl(210, 80%, 60%)",
        "primary-content": "hsl(210, 80%, 10%)",
        "primary-dark": "hsl(210, 80%, 50%)",
        "primary-light": "hsl(210, 81%, 70%)",

        secondary: "hsl(30, 80%, 60%)",
        "secondary-content": "hsl(30, 80%, 10%)",
        "secondary-dark": "hsl(30, 80%, 50%)",
        "secondary-light": "hsl(30, 81%, 70%)",

        background: "hsl(208, 33%, 10%)",
        foreground: "hsl(211, 35%, 15%)",
        border: "hsl(209, 35%, 25%)",

        copy: "hsl(220, 43%, 99%)",
        "copy-light": "hsl(209, 35%, 85%)",
        "copy-lighter": "hsl(210, 35%, 65%)",

        success: "hsl(120, 80%, 60%)",
        warning: "hsl(60, 80%, 60%)",
        error: "hsl(0, 80%, 60%)",

        "success-content": "hsl(120, 80%, 10%)",
        "warning-content": "hsl(60, 80%, 10%)",
        "error-content": "hsl(0, 0%, 100%)",

        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "#64748B",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#0D9488",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
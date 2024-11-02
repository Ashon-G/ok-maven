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
        primary: "hsl(214, 81%, 50%)",
        "primary-content": "hsl(0, 0%, 100%)",
        "primary-dark": "hsl(214, 81%, 40%)",
        "primary-light": "hsl(214, 81%, 60%)",

        secondary: "hsl(54, 81%, 50%)",
        "secondary-content": "hsl(60, 100%, 0%)",
        "secondary-dark": "hsl(54, 81%, 40%)",
        "secondary-light": "hsl(54, 81%, 60%)",

        background: "hsl(0, 0%, 94%)",
        foreground: "hsl(0, 0%, 98%)",
        border: "hsl(0, 0%, 87%)",

        copy: "hsl(0, 0%, 15%)",
        "copy-light": "hsl(0, 0%, 40%)",
        "copy-lighter": "hsl(0, 0%, 55%)",

        success: "hsl(120, 81%, 50%)",
        warning: "hsl(60, 81%, 50%)",
        error: "hsl(0, 81%, 50%)",

        "success-content": "hsl(120, 100%, 0%)",
        "warning-content": "hsl(60, 100%, 0%)",
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
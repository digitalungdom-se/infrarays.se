module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--brand-color-50)",
          100: "var(--brand-color-100)",
          200: "var(--brand-color-200)",
          300: "var(--brand-color-300)",
          400: "var(--brand-color-400)",
          500: "var(--brand-color-500)",
          600: "var(--brand-color-600)",
          700: "var(--brand-color-700)",
          800: "var(--brand-color-800)",
          900: "var(--brand-color-900)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

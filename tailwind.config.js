/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cust-grey": {
          0: "var(--color-grey-0)",
          50: "var(--color-grey-50)",
          100: "var(--color-grey-100)",
          200: "var(--color-grey-200)",
          300: "var(--color-grey-300)",
          400: "var(--color-grey-400)",
          500: "var(--color-grey-500)",
          600: "var(--color-grey-600)",
          700: "var(--color-grey-700)",
          800: "var(--color-grey-800)",
          900: "var(--color-grey-900)",
        },
        "cust-blue": {
          100: "var(--color-blue-100)",
          700: "var(--color-blue-700)",
        },
        "cust-green": {
          100: "var(--color-green-100)",
          700: "var(--color-green-700)",
        },
        "cust-yellow": {
          100: "var(--color-yellow-100)",
          700: "var(--color-yellow-700)",
        },
        "cust-silver": {
          100: "var(--color-silver-100)",
          700: "var(--color-silver-700)",
        },
        "cust-indigo": {
          100: "var(--color-indigo-100)",
          700: "var(--color-indigo-700)",
        },
        "cust-red": {
          100: "var(--color-red-100)",
          700: "var(--color-red-700)",
          800: "var(--color-red-800)",
        },
      },
    },
  },
  plugins: [],
};

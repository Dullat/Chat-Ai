/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "sans-serif",
    },
    extend: {
      animation: {
        loading: "loading 2s ease-in-out infinite",
      },
      keyframes: {
        loading: {
          "0%, 100%": { backgroundPosition: "-800px 0px" },
          "50%": { backgroundPosition: "0px 0px" },
        },
      },
    },
  },
  plugins: [],
};

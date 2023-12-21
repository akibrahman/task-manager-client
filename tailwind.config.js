/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#162C46",
        secondary: "#091d36",
      },
    },
  },
  plugins: [],
};

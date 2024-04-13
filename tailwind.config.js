/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        icmb: "#0C0C0C",
        icms: "#481E14",
        icmh: "#9B3922",
        icmt: "#F2613F",
      },
    },
  },
  plugins: [],
};

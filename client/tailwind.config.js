/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', "serif"],
        sans: ['"Times New Roman"', "serif"], // Add this line - makes it default
      },
    },
  },
  plugins: [],
};

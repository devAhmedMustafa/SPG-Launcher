/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        black: "#0d0d0d",
        offBlack: "#161616",
        red: "#be0000"
      }
    },
  },
  plugins: [],
}


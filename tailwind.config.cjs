/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      primary:"#daedab",
      lightgrey:"#eeebf2",
      darkgrey:"#bfbfbf",
      secondary:"#e3e0e7"
    },
    extend: {},
  },
  plugins: [],
}

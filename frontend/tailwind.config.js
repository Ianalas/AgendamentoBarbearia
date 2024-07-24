/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'blueDarkPrimary': '#05395E',
        'blueDarkSecondary': '#195986',
      },
    },
  },
  plugins: [],
}


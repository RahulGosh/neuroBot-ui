/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#343541',
        'dark-header': '#212121',
        'dark-sidebar': '#171717',
        'light-bg': '#ffffff',
        'light-text': '#000000',
        'dark-text': '#ffffff',
        'light-sidebar': '#f7f7f8',
      },
    },
  },
  plugins: [],
}
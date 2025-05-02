/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        'col-resize': 'col-resize',
      },
      spacing: {
        'chat': 'calc(100vh - 8rem)',
      },
      colors: {
        // Light theme colors (now first/default)
        'light-bg': '#f5f7fa',
        'light-sidebar': '#ebedf0',
        'light-text': '#1a1a1a',
        'light-hover': '#e1e4e8',
        'light-border': '#d0d4d9',
        
        // Dark theme colors
        'dark-bg': '#343541',
        'dark-header': '#212121',
        'dark-sidebar': '#171717',
        'dark-text': '#ffffff',
        
        // Accent colors
        'primary-accent': '#4299e1',
        'secondary-accent': '#68d391',
        'toggle-light': '#f6ad55',
        'toggle-dark': '#4b5563' // Darker gray for moon icon
      },
    },
  },
  plugins: [],
}
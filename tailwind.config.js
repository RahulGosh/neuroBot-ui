/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'chat': 'calc(100vh - 8rem)', // For chat container height
      },
      colors: {
        // Dark theme colors (unchanged)
        'dark-bg': '#343541',
        'dark-header': '#212121',
        'dark-sidebar': '#171717',
        'dark-text': '#ffffff',
        
        // New light theme colors
        'light-bg': '#f5f7fa',         // Very soft blue-gray
        'light-sidebar': '#ebedf0',    // Gentle gray with subtle blue tint
        'light-text': '#1a1a1a',       // Soft black (easier on eyes than pure #000)
        'light-hover': '#e1e4e8',      // Hover state
        'light-border': '#d0d4d9',     // Borders/divider lines
        
        // Accent colors
        'toggle-light': '#f6ad55',     // Warmer, softer amber
        'toggle-dark': '#63b3ed',      // Softer blue
        'primary-accent': '#4299e1',   // Pleasant blue for links/buttons
        'secondary-accent': '#68d391'  // Soft green for secondary actions
      },
    },
  },
  plugins: [],
}
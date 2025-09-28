
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#2196F3',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        background: '#FFFFFF',
        backgroundAlt: '#F5F5F5',
        surface: '#FFFFFF',
        text: '#212121',
        textSecondary: '#757575',
        border: '#E0E0E0',
        shadow: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

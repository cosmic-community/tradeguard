/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0e14',
          elevated: '#111720',
          card: '#151c26'
        },
        border: {
          DEFAULT: '#1f2937',
          subtle: '#2a3441'
        },
        brand: {
          DEFAULT: '#10b981',
          dark: '#059669'
        },
        bull: '#10b981',
        bear: '#ef4444',
        warn: '#f59e0b'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
}
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#4361ee',
          600: '#3730a3',
          900: '#312e81'
        }
      }
    }
  },
  plugins: []
}
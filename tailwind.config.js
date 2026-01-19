/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#a77f72', // Light coffee
          600: '#8a5a4a', // Medium coffee
          700: '#6f4e37', // Coffee Base
          800: '#5a3e2b',
          900: '#432e20',
          950: '#2a1c13',
        },
        cream: {
          50: '#fffff0',
          100: '#fffdd0', // Cream Base
          200: '#fdfcdc',
          300: '#faf8c8',
          400: '#fdfeb8',
          500: '#fbf895',
          600: '#e6e270',
          700: '#bfbb4d',
          800: '#999539',
          900: '#7a7630',
          950: '#424016',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

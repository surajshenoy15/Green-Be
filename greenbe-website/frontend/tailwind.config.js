/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#eef8f1',
          100: '#d8efdf',
          200: '#b3dfc2',
          300: '#82c69d',
          400: '#50aa74',
          500: '#2f8d59',
          600: '#227346',
          700: '#1c5c3a',
          800: '#194a31',
          900: '#143d29',
          950: '#092219'
        },
        limeleaf: '#b9dc63',
        cream: '#f7f8f2'
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif']
      },
      boxShadow: {
        soft: '0 24px 70px -30px rgba(16, 69, 42, 0.35)'
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(110deg, rgba(6, 32, 22, .92), rgba(10, 57, 36, .70) 48%, rgba(10, 57, 36, .15)), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=88')"
      }
    }
  },
  plugins: []
}

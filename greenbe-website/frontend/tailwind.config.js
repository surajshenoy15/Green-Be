/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // GreenBe brand: vivid sky blue + fresh leaf green, sampled from the official logo.
        brand: {
          50: '#F2F9FF',
          100: '#E3F4FF',
          200: '#C5E9FF',
          300: '#8ED1FB',
          400: '#3BAFF4',
          500: '#0090E9',
          600: '#007AC8',
          700: '#0867AC',
          800: '#0C4D82',
          900: '#0D3259',
          950: '#081C36'
        },
        lime: '#70E11F',
        cream: '#F7FBFE'
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif']
      },
      boxShadow: {
        soft: '0 22px 65px -34px rgba(8, 42, 77, .24)',
        float: '0 28px 76px -30px rgba(0, 82, 150, .26)'
      }
    }
  },
  plugins: []
}

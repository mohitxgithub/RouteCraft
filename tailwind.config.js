module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // This enables dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99caff',
          300: '#66b0ff',
          400: '#3395ff',
          500: '#007bff',
          600: '#0062cc',
          700: '#004a99',
          800: '#003166',
          900: '#001933',
        },
        secondary: {
          50: '#fff9e6',
          100: '#fef3cc',
          200: '#fde799',
          300: '#fcdb66',
          400: '#fbcf33',
          500: '#fac300',
          600: '#c89c00',
          700: '#967500',
          800: '#644e00',
          900: '#322700',
        },
        accent: {
          50: '#ffebe6',
          100: '#ffd7cc',
          200: '#ffaf99',
          300: '#ff8766',
          400: '#ff5f33',
          500: '#ff3700',
          600: '#cc2c00',
          700: '#992100',
          800: '#661600',
          900: '#330b00',
        },
      },
    },
  },
  plugins: [],
}


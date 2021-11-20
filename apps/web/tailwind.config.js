const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './apps/web/pages/**/*.{js,ts,jsx,tsx}',
    './apps/web/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5fafd',
          100: '#ebf5fb',
          200: '#cce5f6',
          300: '#aed6f1',
          400: '#71b7e6',
          500: '#3498db',
          600: '#2f89c5',
          700: '#2772a4',
          800: '#1f5b83',
          900: '#194a6b',
        },
      },
    },
    fontFamily: {
      sans: ['Vazir', ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

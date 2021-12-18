const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './apps/web/pages/**/*.{js,ts,jsx,tsx}',
    './apps/web/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              maxWidth: 'none',
            },
          ],
        },
      }),
      colors: {
        primary: {
          50: '#f4f9ff',
          100: '#e9f4ff',
          200: '#c7e3ff',
          300: '#a5d3ff',
          400: '#62b1ff',
          500: '#1e90ff',
          600: '#1b82e6',
          700: '#176cbf',
          800: '#125699',
          900: '#0f477d',
        },
      },
      fontFamily: {
        sans: ['Vazir', ...defaultTheme.fontFamily.sans],
        mono: ['"Vazir Code"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

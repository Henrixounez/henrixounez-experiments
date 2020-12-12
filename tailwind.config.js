const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors,
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '4rem': '4rem',
      '5rem': '5rem',
      '6rem': '6rem',
      '7rem': '7rem'
    },
    lineHeight: {
      '3xl': '1.875rem',
      '5xl': '3rem',
      '4rem': '4rem',
      '5rem': '5rem',
      '6rem': '6rem',
      '7rem': '7rem'
    }
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {},
  plugins: [],
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  xwind: {
    mode: 'objectstyles',
  },
}

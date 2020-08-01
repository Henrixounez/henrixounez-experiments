const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
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
  variants: {},
  plugins: [require('@tailwindcss/ui')],
}

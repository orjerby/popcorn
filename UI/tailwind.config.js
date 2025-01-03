const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {},
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities({
        rounded: (value) => ({
          'border-radius': `calc(var(--spacing) * ${value})`,
        }),
      })
    }),
  ],
}

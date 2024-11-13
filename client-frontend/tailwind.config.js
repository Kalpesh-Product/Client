/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Popins-Regular', 'sans-serif'], // Set Poppins as default sans-serif
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.half-border': {
          position: 'relative',
        },
        '.half-border::after': {
          content: '""',
          position: 'absolute',
          bottom: '0',          /* Position at the bottom */
          left: '50%',          /* Start at the center horizontally */
          transform: 'translateX(-50%)', /* Center it */
          width: '70%',         /* Set width to half of the parent */
          borderBottom: '1px solid gray', /* Create the bottom border */
          color:'gray'
        },
      });
    },
    require('tailwindcss-motion')
  ],
}



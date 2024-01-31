/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-bg": "#F6F6F6"
      },
      animation: {
        'spin-infinite': 'spin-infinite 5s linear infinite'
      },
      keyframes: {
        'spin-infinite': {
          '0%': {
            transform: 'rotate(0deg)', transformOrigin: 'center'
          },
          '100%': {
            transform: 'rotate(360deg)', transformOrigin: 'center'
          },

        }
      }
    },
  },
  plugins: [],
}


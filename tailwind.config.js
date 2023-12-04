/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'upside-bar': '#000000',
        'background': '#191919',
        'box-color': '#2D2D2D',
        'contrast-box-color': '#3F3F3F',
        'dark-purple' : '#48248B',
        'light-purple' : '#9A77EC',
        'custom-grey' : '#A9A9A9',
        'hover-static' : '#39F0BA',
        'success-green': '#4CAF50',
        'warning-yellow': '#FFC107',
        'error-red': '#F44336',
      },
      backgroundImage: {
        'vertical-purple-gradient': 'linear-gradient(180deg, #570CD5, #C67EFF)',
        'horizontal-purple-gradient': 'linear-gradient(270deg, #570CD5, #C67EFF)',
      },
    },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
  },
  plugins: [],
}

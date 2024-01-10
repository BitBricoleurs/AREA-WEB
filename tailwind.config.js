/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'upside-bar': '#000000',
        'background': '#191919',
        'box-color': '#2D2D2D',
        'contrast-box-color': '#3F3F3F',
        'dark-purple': '#48248B',
        'light-purple': '#9A77EC',
        'custom-grey': '#A9A9A9',
        'hover-static': '#39F0BA',
        'success-green': '#4CAF50',
        'warning-yellow': '#FFC107',
        'error-red': '#F44336',
        'custom-light-blue': '#383C4A',
        'custom-dark-blue' : '#2A2D38',
        'custom-darker-blue' : '#191C20',
      },
      backgroundImage: {
        'vertical-purple-gradient': 'linear-gradient(180deg, #570CD5, #C67EFF)',
        'horizontal-purple-gradient': 'linear-gradient(270deg, #570CD5, #C67EFF)',
        'light-purple-gradient': 'linear-gradient(180deg, #9A77EC, #C67EFF)',
        'background-gradient-landing': 'linear-gradient(245.97deg, #060B25 34.58%, #0E0E2B 51.72%, #823F7D 173.3%)',
        'vertical-card-purple-gradient' : 'linear-gradient(180deg, #570CD5 -35.79%, #C67EFF 138.42%)',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      rotate: {
        '15': '15deg',
        '30': '30deg',
        '60': '60deg',
        '135': '135deg',
        '270': '270deg',
      },
    },
  },
  variants: {
    extend: {
      rotate: ['group-hover'],
      scale: ['group-hover'],
      translate: ['group-hover'],
      filter: ['group-hover'],
      brightness: ['group-hover'],
    },
  },
  plugins : [
  ],
}

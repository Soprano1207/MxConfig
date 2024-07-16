/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'main-pattern': "url('/img/intersecting-circles.svg')",
      },
      container: {
        center: true, // центрирует контейнер
        padding: '2rem', // добавляет внутренние отступы (padding) по бокам
        screens: {
          sm: '100%', // задает ширину контейнера для маленьких экранов
          md: '100%', // задает ширину контейнера для средних экранов
          lg: '1500px', // задает ширину контейнера для больших экранов
          xl: '1500px', // задает ширину контейнера для очень больших экранов
        },
      },
    },
  },
  plugins: [],
});


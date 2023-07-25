/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "Sans-Serif"],
      },
      colors: {
        secondary: "#c3c4c7",
        darkBlue: "#10141E",
        semiDarkBlue: "#161D2F",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".w-poster": {
          width: "calc(25% - 30px)",
        },
      });
    },
  ],
};

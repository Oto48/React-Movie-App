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
        greyishBlue: "#5A698F",
        red: "#FC4747",
      },
      screens: {
        xl: { max: "1400px" },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".w-poster": {
          width: "calc((100% / 3) - (64px / 3))",
        },
        ".w-poster-lg": {
          width: "calc(25% - (120px / 4))",
        },
      });
    },
  ],
};

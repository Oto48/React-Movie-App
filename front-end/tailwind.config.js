/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "Sans-Serif"],
      },
      fontSize: {
        small: "0.69rem",
      },
      screens: {
        small: "480px",
      },
      colors: {
        secondary: "#c3c4c7",
        darkBlue: "#10141E",
        semiDarkBlue: "#161D2F",
        greyishBlue: "#5A698F",
        red: "#FC4747",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".w-poster": {
          width: "calc(50% - (16px / 2))",
        },
        ".w-poster-md": {
          width: "calc((100% / 3) - (64px / 3))",
        },
        ".w-poster-lg": {
          width: "calc(25% - (120px / 4))",
        },
      });
    },
  ],
};

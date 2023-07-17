/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
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

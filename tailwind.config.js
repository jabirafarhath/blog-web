/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: "#37306B",
        secondary: "#66347F",
        accent: "#9E4784",
        bg: "#D27685",
      },
    },
  },
  plugins: [],
};

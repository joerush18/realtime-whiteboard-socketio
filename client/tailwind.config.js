/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["Rubik", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        OpenSans: ['"Open Sans"', "sans-serif"],
      },
      colors: {
        primaryColor: "#ff477e",
        primaryBg: "#282a36",
        secondaryColor: "#027fd9",
        darkBackground: "#1c1e29",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,jsx,js}",
    "./src/**/*.{html,jsx,js}",
    "./src/Components/**/*.{html,jsx,js}",
  ],
  theme: {
    // textColor: this.theme=> this.theme('colors'),
    // textColor: {
    //   primary: "#35B3F4",
    // },
    extend: {
      textColor: {
        primary: "#35B3F4",
        subHeading: "#F3A662",
        subHeadBg: "#1F2937",
        homeBg: "#FAFAFA",
      },
      backgroundColor: {
        homeBg: "#FAFAFA",
      },
    },
  },
  plugins: [],
};

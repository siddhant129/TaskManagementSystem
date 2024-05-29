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
        homeBg: "#e8e8e8",
        navBg: "#7BA5E3",
        color1: "#f3a662",
        color2: "#35b2f3",
        color3: "#1fa7ee",
        inpBg: "#FAFAFA",
      },
      backgroundColor: {
        homeBg: "#FAFAFA",
        btnBg: "#89B9FF",
        color1: "#f3a662",
        color2: "#35b2f3",
        color3: "#1fa7ee",
        logBg: "#6284B5",
      },
    },
  },
  plugins: [],
};

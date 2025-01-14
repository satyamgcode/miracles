/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      backdropBlur: {
        24: "24px",
      },
      borderRadius: {
        "c-4xl": "40px",
        "c-8xl": "80px",
      },
      colors: {
        background: "#F3F5F9",
        custom: {
          "blue-100": "#DFF3F6",
          "blue-200": "#E4E9F3",
          "blue-300": "#E4ECF7",
          "yellow-100": "#DAFF98",
          "yellow-150": "#E9FFC1",
          "yellow-200": "#BDE27A",
          "yellow-300": "#CAFF6A",
          "green-300": "#398B39",
          "grey-50": "#DFDFDF",
          "grey-100": "#E9ECEF",
          "grey-150": "#3B4752",
          "grey-200": "#B4C0D0",
          "grey-400": "#1F293314",
          "grey-500": "#1F2933",
          "grey-600": "#FFFFFF33",
          "grey-800": "#BAD8F14D",
          "grey-900": "#1F2933A3",
          "dark-100": "#00000099",
          "dark-200": "#1F293366",
          "dark-300": "#0C1014",
          "dark-400": "#000101",
          "light-100": "#E4E9F34D",
        },
        text: {
          tertiary: "#475467",
        },
      },
    },
  },
  plugins: [],
};

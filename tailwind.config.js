/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./assets/styles/**/*.css",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      navbar: ["Homemade Apple"],
      h1: ["Kalam"],
      h3: ["Kalam"],
      body: ["Kalam"],
      titleTest: ["Poppins"],
      bodyTest: ["Montserrat"],
      input: ["Kalam"],
      button: ["Kalam"],
      footer: ["Kalam"],
      tacom: ["TACOM"],
      claymont: ["Claymont"],
      amigo: ["Amigo"],
      easter: ["Easter"],
      halloween: ["Halloween"],
      joyeuxNoel: ["JoyeuxNoel"],
      scaryPumpkin: ["ScaryPumpkin"],
      natal: ["Natal"],
      shivaraja: ["Shivaraja"],
      windhavi: ["Windhavi"],
      zhabuki: ["Zhabuki"],
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
    },
    extend: {
      colors: {
        primary: "#1c044f",
        secondary: "#1d073a",
      },
      lineClamp: {
        8: "8",
        10: "10",
      },
    },
  },
  plugins: [],
};
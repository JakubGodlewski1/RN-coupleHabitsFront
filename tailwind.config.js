/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./hooks/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        alRegular: "AbhayaLibre-Regular",
        alMedium:"AbhayaLibre-Medium",
        alSemiBold:"AbhayaLibre-SemiBold",
        alBold:"AbhayaLibre-Bold",
        alExtraBold:"AbhayaLibre-ExtraBold",
      },
      colors:{
        success: "#25e56b",
        error: "#e52525",
        primary: "#14C2EF",
        secondary: "#EBF4CA"
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./hooks/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                mainRegular: "AbhayaLibre-Regular",
                mainMedium: "AbhayaLibre-Medium",
                mainSemiBold: "AbhayaLibre-SemiBold",
                mainBold: "AbhayaLibre-Bold",
                mainExtraBold: "AbhayaLibre-ExtraBold",
            },
            colors: {
                primary: "#FF5545",
                secondary: "#6EC166",
                tertiary: "#69BCFC",
                tertiaryLight: "#C8EDFE",
                background: "#E5F6FE",
                skip: "#D2D7E5",
                accent: "#413085",
                "backgroundItem": "#828282"

            }
        },
    },
    plugins: [],
}


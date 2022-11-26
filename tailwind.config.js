module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: "#eab208",
        lightPrimary: "#bfdbfe",
        primary: "#0070f3",
        secondPrimary: "#1890FF",
        darkPrimary: "#161E68",
        white: "#ffffff",
        transparentGray: "rgba(243, 244, 246, 0.3)",
        transparentWhite: "rgba(255,255,255,0.7)",
        lightGray: "#6b7280",
        gray: "#f3f4f6",
        darkGray: "#d1d5db",
        deepDarkGray: "#6b7280",
        charCoal: "#3f3844",
        nestGray: "#e5e7eb",
        green: "#22c55e",
        limeGreen: "#00FF00",
        transparentGreen: "rgb(34, 197, 94, 0.7)",
        lightRed: "#fca5a5",
        red: "#ef4444",
        pureRed: "#FF0000",
        purple: "purple",
        turquoise: "#4ecdc4",
        doughnutColors: {
          success: "#34B73A",
          average: "#fd9d38",
          fail: "#f05a64",
        },
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "750px",
        lg: "970px",
        xl: "1170px",
        "2xl": "1170px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

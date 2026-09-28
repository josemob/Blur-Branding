/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#5A8490",
          tealLight: "#83A3AC",
          cyan: "#2E9CB4",
          dark: "#1B2A2E",
          darker: "#0E1719",
          ink: "#090909",
        },
        surface: {
          base: "#EEEEEE",
          card: "#F5F4F3",
          soft: "#EAEAEA",
        },
      },
      fontFamily: {
        display: ['"Figerona"', "Inter Tight", "sans-serif"],
        sans: ['"Inter Tight"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "marquee-rev": "marquee 45s linear infinite reverse",
      },
    },
  },
  plugins: [],
};

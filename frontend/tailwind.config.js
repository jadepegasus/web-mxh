/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,css}"],
  theme: {
    extend: {
      keyframes: {
        slipToTop: {
          "0%": {
            transform: "translateY(-70%)",
            opacity: "0.4",
          },
          "100%": {
            transform: "translateY(-100%)",
            opacity: "1",
          },
        },
        shake: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        }
      },
      animation: {
        "shaking-like": "shake 2s linear infinite",
        "slip-to-top": "slipToTop 400ms linear 1",
      }
    }
  },
  plugins: [require("daisyui")]
}


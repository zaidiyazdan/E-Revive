/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        stroke: '0 0 0 4px rgba(255, 255, 255, 0.5)',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}


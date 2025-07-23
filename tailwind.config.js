/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      navy: {
        900: '#1B2A41',
        950: '#0F1C2E',
      },
      ice: '#A9D6E5',
    },},
    fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
  },
  plugins: [],
}
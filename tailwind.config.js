/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B4513',
          light: '#D2691E',
          dark: '#5D3A1A',
        },
        secondary: {
          DEFAULT: '#2F4F4F',
          light: '#708090',
          dark: '#1C3334',
        },
      },
    },
  },
  plugins: [],
}

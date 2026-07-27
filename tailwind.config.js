/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
    fontFamily: {
      heading: ['Space Grotesk'],
      body: ['Geomini'],
      testHead: ['Montenegrin Gothic One'],
      archivo: ["Archivo Black"], // ← Add this
    },
  },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
            animation: {
                  "up-down": "up-down 2s ease-in-out infinite alternate",
            },
    },
   
  },
  plugins: [],
}


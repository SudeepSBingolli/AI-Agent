/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#e0faf5',
          200: '#b3f0e8',
          300: '#85e6da',
          400: '#57dccf',
          500: '#2ad2c4',
          600: '#1ba89a',
          700: '#157d73',
          800: '#0f524d',
          900: '#092726',
        },
      },
    },
  },
  plugins: [],
}

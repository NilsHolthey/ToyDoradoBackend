/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4da64d',
        secondary: '#339933',
        highlight: '#e6f2e6',
        bgGray: '#fbfafd',
        delete: '#ff6961',
        deleteLight: '#FFAAA6',
      },

      boxShadow: {
        green: '0px 4px 8px -1px rgba(230 242 230 )',
      },
    },
  },
  plugins: [],
};

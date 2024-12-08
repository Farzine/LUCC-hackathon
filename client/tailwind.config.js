/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
      './pages/**/*.{js,jsx}', './components/**/*.{js,jsx}',
    ],
    theme: {
      extend: {
        colors: {
          'customPurple': '#4B47FF',
          'customGray': '#E9E4E4',
          customRed :"#FF4155",
          background: "#f6efef",
        },
        animation: {
          scroll: 'scroll 30s linear infinite',
        },
        keyframes: {
          scroll: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' },
          },
        },
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
          roboto: ['Roboto', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
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
          DEFAULT: "#004ac6",
          container: "#2563eb",
          fixed: "#dbe1ff",
          dim: "#b4c5ff",
        },
        secondary: {
          DEFAULT: "#712ae2",
          container: "#8a4cfc",
          fixed: "#eaddff",
          dim: "#d2bbff",
        },
        surface: {
          DEFAULT: "#faf8ff",
          bright: "#faf8ff",
          dim: "#d9d9e5",
          container: {
            lowest: "#ffffff",
            low: "#f3f3fe",
            DEFAULT: "#ededf9",
            high: "#e7e7f3",
            highest: "#e1e2ed",
          },
        },
        on: {
          surface: "#191b23",
          background: "#191b23",
          primary: "#ffffff",
          secondary: "#ffffff",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceWave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        bounce1: 'bounceWave 0.9s ease-in-out infinite',
        bounce2: 'bounceWave 0.9s ease-in-out infinite 0.1s',
        bounce3: 'bounceWave 0.9s ease-in-out infinite 0.2s',
        bounce4: 'bounceWave 0.9s ease-in-out infinite 0.3s',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: { glow: '0 0 0 1px rgba(45,212,191,.15), 0 20px 70px rgba(15,23,42,.35)' }
    }
  },
  plugins: []
};

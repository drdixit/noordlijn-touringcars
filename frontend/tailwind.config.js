/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F2F5F9', 100: '#E3E9F1', 200: '#C5D1E0', 300: '#9AADC6', 400: '#6A83A5',
          500: '#476287', 600: '#344C6F', 700: '#263B5A', 800: '#1A2C47', 900: '#112038', 950: '#0A1526',
        },
        signal: { 50: '#FBEFEF', 100: '#F5D8D9', 500: '#B8333A', 600: '#A02A31', 700: '#862229' },
        ink: '#1B2430',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { DEFAULT: '3px', md: '4px', lg: '6px' },
      maxWidth: { site: '1240px' },
    },
  },
  plugins: [],
};

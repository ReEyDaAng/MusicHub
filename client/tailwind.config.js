/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          // базові кольори
          primary: '#00C853',     // лаймовий-зелений
          background: '#000000',  // чисто чорний
          surface: '#111111',     // для карток і панелей
          accent: '#1B5E20',      // темно-зелений для hover/акцентів
          text: '#E0F2F1',        // світло-блідо-зелений для тексту
        }
      },
    },
    plugins: [],
  };
  
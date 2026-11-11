import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAF4EC',
        foreground: '#3A5238',
        sage: '#6D8B6A',
        tan: '#DCC2A0',
      },
      fontFamily: {
        body: ['var(--font-nunito)', 'sans-serif'],
        heading: ['var(--font-nunito)', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        card: '24px',
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'primary-black': '#1F1C17',
        'text-primary-black': '#3E3E3E',
        'text-secondary': '#9B9B9B',
        cream: '#F5EFE0',
        'primary-blue': '#41A0E4',
        'primary-grey': '#A19B91',
        'low-grey': '#F9F9F9',
      },
    },
  },
  plugins: [animate],
};
export default config;

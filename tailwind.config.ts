import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        'primary-dark': '#0052CC',
        success: '#00C027',
        danger: '#FF0000',
        warning: '#FFB81C',
        'dark-bg': 'var(--color-bg)',
        'dark-surface': 'var(--color-surface)',
        'dark-surface-alt': 'var(--color-surface-alt)',
        'dark-border': 'var(--color-border)',
        'dark-text': 'var(--color-text)',
        'dark-text-secondary': 'var(--color-text-secondary)',
      },
      backgroundColor: {
        dark: 'var(--color-bg)',
        'dark-surface': 'var(--color-surface)',
        'dark-surface-alt': 'var(--color-surface-alt)',
      },
    },
  },
  plugins: [],
};

export default config;

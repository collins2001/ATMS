const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: '#94a3b8',
        'secondary-light': 'var(--color-secondary-light)',
        'secondary-dark': 'var(--color-secondary-dark)',
        success: '#22c55e',
        'success-light': 'var(--color-success-light)',
        'success-dark': 'var(--color-success-dark)',
        danger: '#ef4444',
        'danger-light': 'var(--color-danger-light)',
        'danger-dark': 'var(--color-danger-dark)',
        warning: '#f59e0b',
        'warning-light': 'var(--color-warning-light)',
        'warning-dark': 'var(--color-warning-dark)',
        info: '#0ea5e9',
        'info-light': 'var(--color-info-light)',
        'info-dark': 'var(--color-info-dark)',
        background: 'var(--color-background)',
        'background-alt': 'var(--color-background-alt)',
        card: 'var(--color-card)',
        text: 'var(--color-text)',
        'text-alt': 'var(--color-text-alt)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Inter', 'var(--font-family-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-family-mono)', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        // Map CSS variables to Tailwind spacing scale if needed
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)',
      },
      transitionTimingFunction: {
         DEFAULT: 'var(--transition-timing-function)',
      },
    },
  },
  plugins: [],
} 
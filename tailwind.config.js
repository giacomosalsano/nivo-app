/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    "./index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      },
      colors: {
        background: 'var(--background)',
        'menu-bg': 'var(--menu-bg)',
        overlay: 'var(--overlay)',
        foreground: 'var(--foreground)',
        'menu-foreground': 'var(--menu-foreground)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'text-primary': 'var(--text-primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-hover': 'var(--secondary-hover)',
        'text-secondary': 'var(--text-secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        tertiary: 'var(--tertiary)',
        'tertiary-hover': 'var(--tertiary-hover)',
        'text-tertiary': 'var(--text-tertiary)',
        'tertiary-foreground': 'var(--tertiary-foreground)',
        error: 'var(--error)',
        'error-hover': 'var(--error-hover)',
        'error-text': 'var(--error-text)',
        success: 'var(--success)',
        'success-hover': 'var(--success-hover)',
        'success-text': 'var(--success-text)',
        alert: 'var(--alert)',
        'alert-hover': 'var(--alert-hover)',
        'alert-text': 'var(--alert-text)',
        info: 'var(--info)',
        'info-hover': 'var(--info-hover)',
        'info-text': 'var(--info-text)',
        disabled: 'var(--disabled)',
        'text-disabled': 'var(--text-disabled)',
        'disabled-hover': 'var(--disabled-hover)',
        border: 'var(--border)',
        'table-even': 'var(--table-even)',
        'border-hover': 'var(--border-hover)',
      }
    },
  },
  plugins: [],
}
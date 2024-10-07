/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(217, 91%, 50%)',
        'primary-lighter': 'hsl(217, 91%, 77%)',
        'primary-light': 'hsl(217, 91%, 67%)',
        'primary-dark': 'hsl(217, 91%, 40%)',
        'primary-darker': 'hsl(217, 91%, 30%)',
        accent: 'hsl(37, 91%, 60%)',
        secondary: 'hsl(0, 0%, 95%)',
        success: 'hsl(145, 63%, 49%)',
        warning: 'hsl(48, 89%, 50%)',
        danger: 'hsl(0, 100%, 50%)',
        'dark-card': 'hsl(222.2 84% 4.9%)',
        'dark-primary-foreground': 'hsl(222.2 47.4% 11.2%)',
        'dark-secondary': 'hsl(217.2 32.6% 17.5%)'
      },
      fontFamily: {
        title: ['Pally-Variable'],
        content: ['Fira Sans', 'sans-serif']
      },
      fontSize: {
        h1: '3.5rem',
        h2: '3rem',
        h3: '2.5rem',
        h4: '2rem',
        h5: '1.5rem',
        h6: '1.25rem'
      },
      lineHeight: {
        h1: '3.85rem',
        h2: '3.3rem',
        h3: '2.75rem',
        h4: '2.2rem',
        h5: '1.65rem',
        h6: '1.375rem'
      },
      width: {
        26: '6.5rem',
        27: '6.75rem',
        29: '7.25rem'
      }
    }
  },
  plugins: []
}

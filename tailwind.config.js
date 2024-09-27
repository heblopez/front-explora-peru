/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(208.552, 64%, 45%)',
        secondary: 'hsl(0, 0%, 95%)',
        success: 'hsl(145, 63%, 49%)',
        warning: 'hsl(48, 89%, 50%)',
        danger: 'hsl(0, 100%, 50%)'
      },
      fontFamily: {
        title: ['Merriweather', 'serif'],
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
      }
    }
  },
  plugins: []
}

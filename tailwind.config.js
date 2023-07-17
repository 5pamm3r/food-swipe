/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '60vh': '60vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '95%': '95%',
        '750': '750px',
      },
      margin: {
        'safeBottom': 'max(2rem, env(safe-area-inset-bottom))'
      },
      
      backgroundColor: {
        bgPrimary: '#1A202C'
      }
    },
    screens: {
      'tall': {'raw': '(min-height: 800px)'},
    }
  },
  plugins: [],
}

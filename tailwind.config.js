/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'lato-black': 'lato-black',
        'lato-medium': 'lato-medium',
        'lato-bold': 'lato-bold',
        'lato-regular': 'lato-regular',
        'lato-semibold': 'lato-semibold'
      },
      colors: {
        transparent: '#00000000',
        green: {
          primary: '#4B5320',
          secondary: '#335C33',
          'secondary-2': '#4F7942'
        },
        brown: {
          camouflage: '#827A60'
        },
        yellow: {
          camouflage: '#C2B280'
        },
        black: {
          'greyscale-main': '#454545'
        },
        white: {
          primary: '#F2F2F2'
        },
        red: {
          secondary: '#D34E24'
        },
        disable: '#8D949E',
        chosen: '#F2F5F7',
        notification: '#169873',
        background: '#FCFCFC'
      },
      fontSize: {
        xs: ['12px', '18px'],
        '2xs': ['13px', '20px'],
        sm: ['14px', '21px'],
        '2sm': ['15px', '22px'],
        md: ['16px', '24px'],
        '2md': ['18px', '27px'],
        lg: ['20px', '22px'],
        '2lg': ['28px', '36px']
      },
      boxShadow: {
        card: '0px 4px 16px rgba(29, 101, 137, 0.15)'
      }
    }
  },
  plugins: []
};

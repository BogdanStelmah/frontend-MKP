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
        blue: {
          primary: '#175676',
          secondary: '#113E55',
          'secondary-2': '#1E7099',
          disabled: '#7D9DAD',
          ellipse: '#013E5C'
        },
        black: {
          main: '#2A1A1F',
          status: '#000000'
        },
        white: {
          inputBg: '#FCFCFC',
          greyscale: '#FFFFFF',
          disabled: '#F2F2F2'
        },
        grey: {
          greyscale: '#909590',
          'greyscale-2': '#D4D5D4'
        },
        red: {
          secondary: '#D34E24'
        },
        chosen: '#F2F5F7',
        notification: '#169873',
        background: '#FCFCFC'
      },
      fontSize: {
        '2xs': ['13px', '20px'],
        xs: ['14px', '20px'],
        sm: ['15px', '22px'],
        md: ['16px', '24px'],
        lg: ['28px', '36px']
      },
      boxShadow: {
        card: '0px 4px 16px rgba(29, 101, 137, 0.15)'
      }
    }
  },
  plugins: []
};

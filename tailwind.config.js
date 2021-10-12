module.exports = {
  purge: ['./src/components/**/*.{js,jsx,tx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '128': '32rem',
        '2/18': '11.1111111%'
      },
      height: {
        '100': '25rem',
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      backgroundImage: {
        'dotted_frame': "url('icons/dotted_frame.png')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

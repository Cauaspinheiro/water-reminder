module.exports = {
  darkMode: false, // or 'media' or 'class',
  purge: [
    './**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0094FF',
        'title':'#D9EAFF',
        'content': '#94A3B6',
        'page': '#202833',
        'container': '#2D3948',
        'input': '#3E4E62'
      },
      backgroundImage: {
        'gradient': 'linear-gradient(180deg, #0094FF 0%, #004CE0 150%)',
        'cancel-gradient': 'linear-gradient(129.72deg, #CB4242 23.33%, #AD0F0F 95.5%)'
      },
      fontFamily: {
        poppins: 'Poppins, Roboto, sans-serif',
      }
    },
  },
  variants: {
  },
  plugins: [],
};

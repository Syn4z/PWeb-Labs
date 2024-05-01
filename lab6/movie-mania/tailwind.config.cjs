/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-bg-color': 'var(--navbar-bg-color)',
        'bg-color': 'var(--background-color)',
        'genre-bg-color': 'var(--genre-bg-color)',
        'page-text-color': 'var(--page-text-color)',
        'cast-name-color': 'var(--cast-name-color)',
        'release-text-color': 'var(--release-text-color)',
        'release-bg-color': 'var(--release-bg-color)',
      },
      backgroundImage: {
        'searchbg': "url('./src/assets/images/movies.jpg')",
      }
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'Roboto': ['Roboto', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

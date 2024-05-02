/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'dark-theme',
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-bg-color': 'var(--navbar-bg-color)',
        'navbar-element-bg': 'var(--navbar-element-bg)',
        'navbar-element-border': 'var(--navbar-element-border)',
        'navbar-text-color': 'var(--navbar-text-color)',
        'bg-color': 'var(--background-color)',
        'genre-bg-color': 'var(--genre-bg-color)',
        'page-text-color': 'var(--page-text-color)',
        'cast-name-color': 'var(--cast-name-color)',
        'release-text-color': 'var(--release-text-color)',
        'release-bg-color': 'var(--release-bg-color)',
        'search-bar-bg1': 'var(--search-bar-bg1)',
        'search-bar-bg2': 'var(--search-bar-bg2)',
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

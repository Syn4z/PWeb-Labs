import React, { useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import moviesData from './data/moviesData';

function App() {
  const [movies, setMovies] = useState(moviesData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredMovies = moviesData.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Mania</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main className="main-content">
        <h2>Popular Movies</h2>
        <MovieList movies={movies} />
      </main>
    </div>
  );
}

export default App;

import { createContext, useState, useEffect } from "react";

const Contextpage = createContext();

export function MovieProvider({ children }) {

  const [header, setHeader] = useState("Genres");
  const [totalPage, setTotalPage] = useState(null)
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(36);
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const APIKEY = import.meta.env.VITE_API_KEY;


  useEffect(() => {
    if (page < 1) {
      setPage(1) 
    }
  }, [page]);


  const filteredGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${activegenre}&api_key=${APIKEY}&with_origin_country=US&page=${page}`
    );
    const filteredGenre = await data.json();
    setMovies(movies.concat(filteredGenre.results)); 
    setTotalPage(filteredGenre.total_pages);
    setLoader(false);
    setHeader("Genres");
  };

  const fetchSearch = async (query) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&with_origin_country=US&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const searchmovies = await data.json();
    setSearchedMovies(searchmovies.results); 
    setLoader(false);
    setHeader(`Results for "${query}"`);
  }

  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&with_origin_country=US&language=en-US`
    );
    const gen = await data.json();
    setGenres(gen.genres);
  }

  const fetchTrending = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&with_origin_country=US&page=${page}`
    );
    const trend = await data.json();
    setTrending(trending.concat(trend.results));
    setTotalPage(trend.total_pages);
    setLoader(false);
    setHeader("Trending Movies");
  }

  const fetchUpcoming = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&with_origin_country=US&language=en-US&page=${page}`
    );
    const upc = await data.json();
    setUpcoming(upcoming.concat(upc.results));
    setTotalPage(upc.total_pages);
    setLoader(false);
    setHeader("Upcoming Movies");
  }

  async function addFavorite(movie) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async function getFavorites() {
    const response = await fetch(`${apiUrl}/favorites`);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const movies = await response.json();
    const moviesArray = Object.values(movies).map(movie => ({ [movie.id]: movie }));
    setFavorites(moviesArray);
    setHeader("Favorite Movies");
  }

  async function updateFavorite(id, movie) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/favorites/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async function deleteFavorite(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: 'subscriber' })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
}

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setLoader,
        fetchTrending,
        trending,
        fetchUpcoming,
        upcoming,
        favorites,
        addFavorite,
        getFavorites,
        deleteFavorite,
        setFavorites,
        handleLogin,
        totalPage,
        searchedMovies
      }}
    >
      {children}
    </Contextpage.Provider>
  );

}

export default Contextpage

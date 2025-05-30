import React, { createContext, useContext, useState, useEffect } from 'react';

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all movies
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading movies:', error);
        setIsLoading(false);
      });
  }, []);

  const getMovieById = (id) => {
    return movies.find(movie => movie.id === parseInt(id));
  };

  return (
    <MoviesContext.Provider value={{ movies, isLoading, getMovieById }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
} 
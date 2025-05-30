import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorites } from './contexts/FavoritesContext';
import { useMovies } from './contexts/MoviesContext';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const { getMovieById } = useMovies();
  const { isFavorite, toggleFavorite } = useFavorites();
  const movie = getMovieById(id);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <Link to="/">&larr; Back to Home</Link>
      <div className="movie-header">
        <h1>{movie.title}</h1>
        <button 
          className={`favorite-btn ${isFavorite(movie.id) ? 'favorite-active' : ''}`}
          onClick={() => toggleFavorite(movie.id)}
          aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          ★
        </button>
      </div>
      <img src={movie.poster} alt={movie.title} className="details-poster" />
      <p>{movie.description}</p>
      <video controls width="640" src={movie.videoUrl} poster={movie.poster} />
    </div>
  );
}

export default MovieDetails; 
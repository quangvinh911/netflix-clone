import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFavorites } from './contexts/FavoritesContext';
import { useMovies } from './contexts/MoviesContext';
import './Home.css';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleRows, setVisibleRows] = useState(4);
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorites();
  const { movies, isLoading } = useMovies();
  const itemsPerPage = 4;
  const maxRows = 15;
  const moviesPerRow = 5;

  const featured = movies[0];

  // Calculate pagination for favorite movies
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id));
  const totalPages = Math.ceil(favoriteMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFavorites = favoriteMovies.slice(startIndex, endIndex);

  // Calculate visible movies for all movies section
  const totalMovies = movies.length;
  const totalRows = Math.ceil(totalMovies / moviesPerRow);
  const visibleMovies = movies.slice(0, visibleRows * moviesPerRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.querySelector('.favorites-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleExtend = () => {
    setVisibleRows(prev => Math.min(prev + 4, maxRows));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {featured && (
        <div className="hero-banner" style={{ backgroundImage: `url(${featured.poster})` }}>
          <div className="hero-banner-content">
            <h1 className="hero-banner-title">{featured.title}</h1>
            <p className="hero-banner-desc">{featured.description}</p>
            <div className="hero-banner-buttons">
              <button className="hero-btn play" onClick={() => navigate(`/movie/${featured.id}`)}>Play</button>
              <button className="hero-btn info">More Info</button>
            </div>
          </div>
          <div className="hero-banner-fade" />
        </div>
      )}

      {/* Favorite Movies Section */}
      {favoriteMovies.length > 0 && (
        <div className="favorites-section">
          <div className="section-header">
            <h2 className="section-title">My Favorites</h2>
            <div className="section-decoration"></div>
          </div>
          <div className="favorites-grid">
            {currentFavorites.map((movie, index) => (
              <div 
                key={movie.id} 
                className="movie-card favorite-card"
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="movie-card-inner">
                  <img src={movie.poster} alt={movie.title} />
                  <div className="movie-card-overlay">
                    <h2>{movie.title}</h2>
                    <button className="play-button">▶ Play</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}

      {/* All Movies Section */}
      <div className="movies-section">
        <div className="section-header">
          <h2 className="section-title">All Movies</h2>
          <div className="section-decoration"></div>
        </div>
        <div className="movies-grid">
          {visibleMovies.map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
              <div className="movie-card-inner">
                <img src={movie.poster} alt={movie.title} />
                <div className="movie-card-overlay">
                  <h2>{movie.title}</h2>
                  <button className="play-button">▶ Play</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {visibleRows < maxRows && visibleRows < totalRows && (
          <div className="extend-section">
            <button className="extend-button" onClick={handleExtend}>
              Show More Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home; 
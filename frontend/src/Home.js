import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const featured = movies[0];

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
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
            <img src={movie.poster} alt={movie.title} />
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home; 
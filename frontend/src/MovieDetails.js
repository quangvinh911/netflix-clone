import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <Link to="/">&larr; Back to Home</Link>
      <h1>{movie.title}</h1>
      <img src={movie.poster} alt={movie.title} className="details-poster" />
      <p>{movie.description}</p>
      <video controls width="640" src={movie.videoUrl} poster={movie.poster} />
    </div>
  );
}

export default MovieDetails; 
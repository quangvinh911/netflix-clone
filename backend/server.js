const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());

// Get all movies
app.get('/api/movies', (req, res) => {
  const movies = JSON.parse(fs.readFileSync(path.join(__dirname, 'movies.json')));
  res.json(movies);
});

// Get movie by id
app.get('/api/movies/:id', (req, res) => {
  const movies = JSON.parse(fs.readFileSync(path.join(__dirname, 'movies.json')));
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
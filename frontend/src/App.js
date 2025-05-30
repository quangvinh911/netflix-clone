import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { MoviesProvider } from './contexts/MoviesContext';
import Home from './Home';
import MovieDetails from './MovieDetails';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <MoviesProvider>
          <Routes>
            <Route path="/" element={
              <FavoritesProvider>
                <Home />
              </FavoritesProvider>
            } />
            <Route path="/movie/:id" element={
              <FavoritesProvider>
                <MovieDetails />
              </FavoritesProvider>
            } />
          </Routes>
        </MoviesProvider>
      </div>
    </Router>
  );
}

export default App;

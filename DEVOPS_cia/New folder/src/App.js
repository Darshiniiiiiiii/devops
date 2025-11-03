// src/App.js
import React, { useState, useMemo } from 'react';
import MovieCard from './MovieCard';
import initialMovies from './initialMovies'; // Correct Import
import './App.css'; 

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [filterDirector, setFilterDirector] = useState('All');

  // Function to update the rating of a specific movie
  const updateRating = (id, newRating) => {
    // Ensure the new rating is within the 1.0 - 5.0 range
    const validRating = Math.max(1.0, Math.min(5.0, newRating));
    
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === id ? { ...movie, initialRating: validRating } : movie
      )
    );
  };

  // Get a unique list of all directors for the filter dropdown
  const uniqueDirectors = useMemo(() => {
    const directors = initialMovies.map(movie => movie.director);
    return ['All', ...new Set(directors)].sort();
  }, []);

  // Filter the movies based on the selected director
  const filteredMovies = useMemo(() => {
    if (filterDirector === 'All') {
      return movies;
    }
    return movies.filter(movie => movie.director === filterDirector);
  }, [movies, filterDirector]);


  return (
    <div className="App">
      <h1>🎬 Acclaimed Tamil Cinema Ratings ⭐</h1>
      
      <div className="filter-container">
        <label htmlFor="director-filter">Filter by Director: </label>
        <select 
          id="director-filter"
          value={filterDirector}
          onChange={(e) => setFilterDirector(e.target.value)}
        >
          {uniqueDirectors.map(director => (
            <option key={director} value={director}>
              {director}
            </option>
          ))}
        </select>
      </div>

      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onRate={updateRating} 
            />
          ))
        ) : (
          <p>No movies found for the selected director.</p>
        )}
      </div>
    </div>
  );
}

export default App;
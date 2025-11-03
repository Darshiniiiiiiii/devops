// src/MovieCard.js
import React from 'react';
import RatingSelector from './RatingSelector';

function MovieCard({ movie, onRate }) {
  
  // Helper function to show star/emoji representation
  const getRatingStars = (rating) => {
    // Show 'Unrated' text if the rating is 0.0
    if (rating === 0.0) {
        return "Unrated"; 
    }
    
    const fullStars = Math.floor(rating);
    let stars = '★'.repeat(fullStars);
    
    // Add half star if remainder is >= 0.5
    if (rating - fullStars >= 0.5) {
      stars += '½'; 
    }
    // Fill the rest with empty stars (only up to 5 total star symbols)
    stars += '☆'.repeat(5 - fullStars - (rating - fullStars >= 0.5 ? 1 : 0));
    return stars;
  }

  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <p>
        **Director:** {movie.director}
      </p>
      <p>
        **Genre:** {movie.genre}
      </p>
      <div className="current-rating-display">
        **Rating:** {movie.initialRating.toFixed(1)}
        <span className="stars-display">{getRatingStars(movie.initialRating)}</span>
      </div>
      
      {/* Rating Selector */}
      <RatingSelector
        movieId={movie.id}
        currentRating={movie.initialRating}
        onRate={onRate}
      />
    </div>
  );
}

export default MovieCard;
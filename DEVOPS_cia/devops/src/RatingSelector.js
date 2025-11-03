// src/RatingSelector.js
import React from 'react';

// Generates rating options: 1.0, 1.5, 2.0, ..., 5.0
// We start from 1.0 because 0.0 is just the initial 'unrated' state.
const ratingOptions = Array.from({ length: 9 }, (_, i) => (i / 2 + 1).toFixed(1));

function RatingSelector({ movieId, currentRating, onRate }) {
    
    const handleChange = (event) => {
        onRate(movieId, parseFloat(event.target.value));
    };

    // Use the current rating if it's > 0, otherwise default to 1.0 for the selector display
    const selectorValue = currentRating > 0 ? currentRating.toFixed(1) : '1.0';

    return (
        <div className="rating-selector">
            <label htmlFor={`rating-${movieId}`}>Your Rating: </label>
            <select 
                id={`rating-${movieId}`} 
                value={selectorValue} 
                onChange={handleChange}
            >
                {/* Always include 'Rate Me' option for clarity if initial rating is 0.0 */}
                {currentRating === 0.0 && <option value="1.0" disabled>Rate Me</option>}

                {ratingOptions.map(option => (
                    <option key={option} value={option}>
                        {option} / 5.0
                    </option>
                ))}
            </select>
        </div>
    );
}

export default RatingSelector;
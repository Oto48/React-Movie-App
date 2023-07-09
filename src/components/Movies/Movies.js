import React, { useEffect, useState } from 'react';

const Movies = ({ endpoint }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const apiKey = 'f5f42920d31e693ff3c7c36e87e03dd4';
        const response = await fetch(`https://api.themoviedb.org/3/discover/${endpoint}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchMedia();
  }, [endpoint]);

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title || movie.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
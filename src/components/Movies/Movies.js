import React, { useEffect, useState } from 'react';

const Movies = ({ endpoint, titleKey }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const apiKey = 'f5f42920d31e693ff3c7c36e87e03dd4';
        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}/all/day?language=en-US&api_key=${apiKey}&page=${1}`);
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
      <h1>{titleKey}</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title || movie.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
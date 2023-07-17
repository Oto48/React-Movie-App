import React, { useEffect, useState } from "react";
import { fetchMedia, fetchTrendingMedia } from "../../services/MovieService";

const Movies = ({ endpoint, isTrending }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (isTrending) {
          data = await fetchTrendingMedia();
        } else {
          data = await fetchMedia(endpoint);
        }
        setMovies(data);
      } catch (error) {
        console.log(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchData();
  }, [endpoint, isTrending]);

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

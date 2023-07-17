import React, { useEffect, useState } from "react";
import { fetchMedia, fetchTrendingMedia } from "../../services/MovieService";
import altImg from "../../assets/images/alt-img.jpg";

const Movies = ({ endpoint, isTrending }) => {
  const [movies, setMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (isTrending) {
          data = await fetchTrendingMedia();
        } else {
          data = await fetchMedia(endpoint);
        }
        console.log(data);
        setMovies(data);
      } catch (error) {
        console.log(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchData();
  }, [endpoint, isTrending]);

  return (
    <div className="flex flex-wrap gap-10 w-full">
      {movies.map((movie) => (
        <div key={movie.id} className="w-poster">
          <div className="h-[220px]">
            <img
              className="w-full h-full rounded-lg object-cover object-center"
              src={baseURL + (movie.backdrop_path || movie.poster_path)}
              alt={altImg}
            />
          </div>
        </div>
      ))}
      {/* <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title || movie.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Movies;

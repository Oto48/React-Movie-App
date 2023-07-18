import React, { useEffect, useState } from "react";
import { fetchMedia, fetchTrendingMedia } from "../../services/MovieService";
import altImg from "../../assets/images/alt-img.jpg";
import movieScoreIcon from "../../assets/images/movie-score-icon.png";

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
    <div className="flex flex-1 flex-wrap gap-10 w-full">
      {movies.map((movie) => (
        <div key={movie.id} className="w-poster">
          <div className="h-[220px]">
            <img
              className="w-full h-full rounded-lg object-cover object-center"
              src={baseURL + (movie.backdrop_path || movie.poster_path)}
              alt={altImg}
            />
          </div>
          <div className="flex">
            <img src={movieScoreIcon} className="w-[15px]" alt="" />
          </div>
          <p>{movie.title || movie.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Movies;

import React, { useEffect, useState } from "react";
import { fetchMedia, fetchTrendingMedia } from "../../services/MovieService";
import altImg from "../../assets/images/alt-img.jpg";
import movieScoreIcon from "../../assets/images/movie-score-icon.png";
import MovieIcon from "../../assets/svg/MovieIcon";
import TVShowIcon from "../../assets/svg/TVShowIcon";

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
        setMovies(data);
      } catch (error) {
        console.log(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchData();
  }, [endpoint, isTrending]);

  return (
    <div className="flex flex-1 flex-wrap gap-10 w-full">
      {movies.map((movie) => {
        const releaseYear = movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : new Date(movie.first_air_date).getFullYear();
        const posterPath = baseURL + (movie.backdrop_path || movie.poster_path);
        const title = movie.title || movie.name;
        const isMovie = movie.title;
        const rating = movie.vote_average.toFixed(1);

        return (
          <div key={movie.id} className="w-poster flex flex-col gap-2">
            <div className="h-52 xl:h-44">
              <img className="w-full h-full rounded-lg object-cover object-center" src={posterPath} alt={altImg} />
            </div>
            <div className="flex gap-2 items-center text-secondary text-sm font-light">
              <p>{releaseYear}</p>
              <div className="w-1 h-1 bg-white opacity-50 rounded-full"></div>
              {isMovie ? (
                <div className="flex gap-2 items-center">
                  <MovieIcon fill={"#c3c4c7"} width={"12px"} height={"12px"} />
                  <p>Movie</p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <TVShowIcon fill={"#c3c4c7"} width={"12px"} height={"12px"} />
                  <p>TV Series</p>
                </div>
              )}
              <div className="w-1 h-1 bg-white opacity-50 rounded-full"></div>
              <img src={movieScoreIcon} className="h-[12px]" alt="" />
              <p>{rating}</p>
            </div>
            <p className="font-medium text-lg">{title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;

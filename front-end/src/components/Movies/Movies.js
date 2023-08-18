import React, { useEffect, useState } from "react";
import {
  fetchMedia,
  fetchTrendingMedia,
  fetchBookmarkedMedia,
  addBookmark,
  removeBookmark,
} from "../../services/MovieService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import movieScoreIcon from "../../assets/images/movie-score-icon.png";
import MovieIcon from "../../assets/svg/MovieIcon";
import TVShowIcon from "../../assets/svg/TVShowIcon";
import BookmarkLogo from "../../assets/svg/BookmarkLogo";

const Movies = ({ endpoint, isTrending, isBookmarked }) => {
  const [movies, setMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original";
  const { user, setUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (isTrending) {
          data = await fetchTrendingMedia();
          setMovies(data);
        } else if (isBookmarked) {
          if (user) {
            data = await fetchBookmarkedMedia(user);
            setMovies(data);
          } else {
            navigate("/login");
          }
        } else {
          data = await fetchMedia(endpoint);
          setMovies(data);
        }
      } catch (error) {
        console.log(`Error fetching ${endpoint}:`, error);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [endpoint, isTrending, isBookmarked, user, isLoading, navigate]);

  const addBookmarkAction = (mediaId, isMovie) => {
    addBookmark(mediaId, isMovie, user, setUser);
  };

  const removeBookmarkAction = (mediaId) => {
    removeBookmark(mediaId, user, setUser);
  };

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

        const isBookmarked = user?.bookmarkedMedia.some((item) => item.mediaId === movie.id);

        return (
          <div key={movie.id} className="w-poster flex flex-col gap-2 relative">
            {isBookmarked ? (
              <div className="absolute top-4 right-6 cursor-pointer" onClick={() => removeBookmarkAction(movie.id)}>
                <BookmarkLogo bookmarked={true} fill={"white"} />
              </div>
            ) : (
              <div
                className="absolute top-4 right-6 cursor-pointer"
                onClick={() => addBookmarkAction(movie.id, movie.media_type)}
              >
                <BookmarkLogo />
              </div>
            )}
            <div className="h-52 xl:h-44">
              <img className="w-full h-full rounded-lg object-cover object-center" src={posterPath} alt="poster" />
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

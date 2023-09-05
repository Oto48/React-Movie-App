import React, { useEffect, useState } from "react";
import { fetchMedia, fetchBookmarkedMedia, addBookmark, removeBookmark } from "../../services/MovieService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import movieScoreIcon from "../../assets/images/movie-score-icon.png";
import altImg from "../../assets/images/alt-img.jpg";
import MovieIcon from "../../assets/svg/MovieIcon";
import TVShowIcon from "../../assets/svg/TVShowIcon";
import BookmarkLogo from "../../assets/svg/BookmarkLogo";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchContext } from "../../context/SearchContext";

const Movies = ({ endpoint, isBookmarked }) => {
  const [movies, setMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original";
  const { user, setUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const { setQuery } = useSearchContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (isBookmarked) {
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

    // Clear search input field in SearchBar
    setQuery("");

    if (!isLoading) {
      fetchData();
    }
  }, [endpoint, isBookmarked, user, isLoading, navigate, setQuery]);

  const addBookmarkAction = (mediaId, isMovie) => {
    addBookmark(mediaId, isMovie, user, setUser);
  };

  const removeBookmarkAction = (mediaId) => {
    removeBookmark(mediaId, user, setUser);
  };

  return (
    <div className="flex-1 p-4 md:p-6 lg:pl-0 lg:p-8">
      <SearchBar setMovies={setMovies} endpoint={endpoint} isBookmarked={isBookmarked} />
      <div className="flex flex-1 flex-wrap gap-x-4 md:gap-x-8 xl:gap-x-10 gap-y-4 md:gap-y-6 xl:gap-y-8 w-full">
        {movies.map((movie) => {
          const releaseYear = movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : new Date(movie.first_air_date).getFullYear();
          const posterPath = movie.backdrop_path
            ? baseURL + movie.backdrop_path
            : movie.poster_path
            ? baseURL + movie.poster_path
            : null;
          const title = movie.title || movie.name;
          const isMovie = movie.title;
          const rating = movie.vote_average?.toFixed(1);

          const isBookmarked = user?.bookmarkedMedia.some((item) => item.mediaId === movie.id);

          return (
            <div key={movie.id} className="w-poster md:w-poster-md xl:w-poster-lg flex flex-col gap-2 relative">
              {isBookmarked ? (
                <div className="absolute top-4 right-6 cursor-pointer" onClick={() => removeBookmarkAction(movie.id)}>
                  <BookmarkLogo bookmarked={true} fill={"white"} />
                </div>
              ) : user ? (
                <div
                  className="absolute top-4 right-6 cursor-pointer"
                  onClick={() => addBookmarkAction(movie.id, movie.media_type)}
                >
                  <BookmarkLogo />
                </div>
              ) : (
                <Link to={"/login"} className="absolute top-4 right-6 cursor-pointer">
                  <BookmarkLogo />
                </Link>
              )}
              <div className="h-28 small:h-36 sm:h-44 xl:h-52">
                {posterPath ? (
                  <img className="w-full h-full rounded-lg object-cover object-center" src={posterPath} alt="poster" />
                ) : (
                  <img className="w-full h-full rounded-lg object-cover object-center" src={altImg} alt="poster" />
                )}
              </div>
              <div className="flex gap-1 small:gap-2 items-center text-secondary text-small small:text-sm font-light">
                {!isNaN(releaseYear) && (
                  <>
                    <p>{releaseYear}</p>
                    <div className="w-0.5 h-0.5 small:w-1 small:h-1 bg-white opacity-50 rounded-full"></div>
                  </>
                )}
                {isMovie ? (
                  <div className="flex gap-2 items-center">
                    <div className="hidden small:block">
                      <MovieIcon fill={"#c3c4c7"} width={"12px"} height={"12px"} />
                    </div>
                    <p>Movie</p>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <div className="hidden small:block">
                      <TVShowIcon fill={"#c3c4c7"} width={"12px"} height={"12px"} />
                    </div>
                    <p>TV Series</p>
                  </div>
                )}
                <div className="w-0.5 h-0.5 small:w-1 small:h-1 bg-white opacity-50 rounded-full"></div>
                <img src={movieScoreIcon} className="h-[12px]" alt="" />
                <p>{rating}</p>
              </div>
              <p className="font-medium text-sm md:text-base xl:text-lg">{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;

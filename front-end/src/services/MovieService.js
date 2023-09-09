import axios from "axios";

const API_KEY = "f5f42920d31e693ff3c7c36e87e03dd4";

export const fetchMedia = async (mediaType) => {
  try {
    const response = await fetch(
      mediaType
        ? `https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`
        : `https://api.themoviedb.org/3/trending/all/day?include_adult=false&include_video=false&language=en-US&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error fetching media:", error);
    throw error;
  }
};

export const fetchBookmarkedMedia = async (user) => {
  if (user?.bookmarkedMedia) {
    try {
      const promises = user.bookmarkedMedia.map(async (media) => {
        const mediaType = media.isMovie ? "movie" : "tv";
        const response = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${media.mediaId}?api_key=${API_KEY}`
        );
        return response.data;
      });

      const data = await Promise.all(promises);
      return data;
    } catch (error) {
      console.error("Error fetching bookmarked media:", error);
    }
  }
};

export const searchMedia = async (query, mediaType) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/${
        mediaType ? mediaType : "multi"
      }?include_adult=false&api_key=${API_KEY}&query=${query}`
    );
    const results = response.data.results;
    return results;
  } catch (error) {
    console.error("Error searching movies:", error);
  }
};

export const searchBookmarkedMedia = async (query, user) => {
  const data = await fetchBookmarkedMedia(user);

  const filteredMovies = data.filter((movie) => {
    const titleMatch = movie.title && movie.title.toLowerCase().includes(query.toLowerCase());
    const nameMatch = movie.name && movie.name.toLowerCase().includes(query.toLowerCase());
    return titleMatch || nameMatch;
  });

  return filteredMovies;
};

export const addBookmark = async (mediaId, isMovie, user, setUser) => {
  try {
    const isMovieFlag = isMovie !== "undefined" && isMovie !== "tv";

    const bookmarkData = {
      mediaId,
      isMovie: isMovieFlag,
      userId: user._id, // Include user ID if needed for identification
    };

    await axios.post("https://react-movie-app-1fej.onrender.com/test", bookmarkData);
    //Check whether the media is a movie or not.

    const updatedBookmarkedMedia = [...user.bookmarkedMedia, { mediaId, isMovie: isMovieFlag }];
    const updatedUser = { ...user, bookmarkedMedia: updatedBookmarkedMedia };
    setUser(updatedUser);
  } catch (error) {
    console.error("Error bookmarking movie:", error);
  }
};

export const removeBookmark = async (mediaId, user, setUser) => {
  try {
    const bookmarkData = {
      mediaId,
      userId: user._id, // Include user ID if needed for identification
    };

    console.log(user._id);

    await axios.delete("https://react-movie-app-1fej.onrender.com/bookmark", bookmarkData);

    const updatedBookmarkedMedia = user.bookmarkedMedia.filter((bookmark) => !(bookmark.mediaId === parseInt(mediaId)));
    const updatedUser = { ...user, bookmarkedMedia: updatedBookmarkedMedia };
    setUser(updatedUser);
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
};

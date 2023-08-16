import axios from "axios";

const API_KEY = "f5f42920d31e693ff3c7c36e87e03dd4";

export const fetchMedia = async (mediaType) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error fetching popular movies:", error);
    throw error;
  }
};

export const fetchTrendingMedia = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error fetching trending movies:", error);
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

export const addBookmark = async (mediaId, isMovie, user, setUser) => {
  try {
    await axios.post(`http://localhost:5000/bookmark/${mediaId}/${isMovie}`, null, {
      withCredentials: true,
    });

    const updatedBookmarkedMedia = [...user.bookmarkedMedia, { mediaId, isMovie }];
    const updatedUser = { ...user, bookmarkedMedia: updatedBookmarkedMedia };
    setUser(updatedUser);
  } catch (error) {
    console.error("Error bookmarking movie:", error);
  }
};

export const removeBookmark = async (mediaId, user, setUser) => {
  try {
    await axios.delete(`http://localhost:5000/bookmark/${mediaId}`, {
      withCredentials: true,
    });

    const updatedBookmarkedMedia = user.bookmarkedMedia.filter((bookmark) => !(bookmark.mediaId === parseInt(mediaId)));
    const updatedUser = { ...user, bookmarkedMedia: updatedBookmarkedMedia };
    setUser(updatedUser);
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
};

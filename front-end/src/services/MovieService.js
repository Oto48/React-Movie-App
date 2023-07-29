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

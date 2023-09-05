import React from "react";
import { searchMedia, fetchMedia, fetchBookmarkedMedia, searchBookmarkedMedia } from "../../services/MovieService";
import SearchIcon from "../../assets/svg/SearchIcon";
import { useSearchContext } from "../../context/SearchContext";
import { useAuth } from "../../context/AuthContext";

const SearchBar = ({ setMovies, endpoint, isBookmarked }) => {
  const { query, setQuery } = useSearchContext();
  const { user } = useAuth();

  const fetchSearchResults = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    if (inputValue) {
      const data = isBookmarked
        ? await searchBookmarkedMedia(inputValue, user)
        : await searchMedia(inputValue, endpoint);
      setMovies(data);
    } else {
      const data = isBookmarked ? await fetchBookmarkedMedia(user) : await fetchMedia(endpoint);
      setMovies(data);
    }
  };

  return (
    <div className="mt-4 mb-8 flex gap-6 items-center">
      <SearchIcon />
      <input
        className="bg-transparent w-full py-4 focus:outline-none border-b border-transparent focus:border-greyishBlue text-base md:text-2xl font-light"
        type="text"
        placeholder="Search for movies or TV series"
        value={query}
        onChange={fetchSearchResults}
      />
    </div>
  );
};

export default SearchBar;

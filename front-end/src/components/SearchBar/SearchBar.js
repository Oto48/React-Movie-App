import React, { useState } from "react";
import { searchMedia, fetchMedia } from "../../services/MovieService";
import SearchIcon from "../../assets/svg/SearchIcon";
import { useSearchContext } from "../../context/SearchContext";

const SearchBar = ({ setMovies, endpoint }) => {
  const { query, setQuery } = useSearchContext();

  const fetchSearchResults = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    if (inputValue) {
      const data = await searchMedia(inputValue, endpoint);
      setMovies(data);
    } else {
      const data = await fetchMedia(endpoint);
      setMovies(data);
    }
  };

  return (
    <div className="mt-4 mb-8 flex gap-6 items-center">
      <SearchIcon />
      <input
        className="bg-transparent w-full py-4 focus:outline-none border-b border-transparent focus:border-greyishBlue text-2xl font-light"
        type="text"
        placeholder="Search for movies or TV series"
        value={query}
        onChange={fetchSearchResults}
      />
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import { searchMedia, fetchMedia } from "../../services/MovieService";

const SearchBar = ({ setMovies, endpoint }) => {
  const [query, setQuery] = useState("");

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
    <div className="my-8">
      <input
        className="bg-red"
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={fetchSearchResults}
      />
    </div>
  );
};

export default SearchBar;

import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function useSearchContext() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [bookmarkQuery, setBookmarkQuery] = useState(false); // Include bookmark-related state here

  return (
    <SearchContext.Provider value={{ query, setQuery, bookmarkQuery, setBookmarkQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

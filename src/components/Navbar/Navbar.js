import React from "react";
import { Link } from "react-router-dom";
import TrendingIcon from "../../assets/svg/TrendingIcon.js";
import MovieIcon from "../../assets/svg/MovieIcon.js";
import TVShowIcon from "../../assets/svg/TVShowIcon.js";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <TrendingIcon />
            <MovieIcon />
            <TVShowIcon />
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/tvshows">TV Shows</Link>
          </li>
          <li>
            <Link to="/trending">Trending</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

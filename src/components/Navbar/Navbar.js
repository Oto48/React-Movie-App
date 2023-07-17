import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
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

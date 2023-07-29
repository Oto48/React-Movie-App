import React from "react";
import { Link } from "react-router-dom";
import TrendingIcon from "../../assets/svg/TrendingIcon.js";
import MovieIcon from "../../assets/svg/MovieIcon.js";
import TVShowIcon from "../../assets/svg/TVShowIcon.js";

const Navbar = () => {
  return (
    <div className="h-screen w-24 pb-16">
      <nav className="bg-semiDarkBlue h-full rounded-2xl py-8">
        <ul className="flex flex-col gap-10">
          <Link to="/trending" className="flex justify-center">
            <TrendingIcon />
          </Link>
          <Link to="/movies" className="flex justify-center">
            <MovieIcon />
          </Link>
          <Link to="/tvshows" className="flex justify-center">
            <TVShowIcon />
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
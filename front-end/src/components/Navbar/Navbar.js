import React from "react";
import { Link } from "react-router-dom";
import TrendingIcon from "../../assets/svg/TrendingIcon.js";
import MovieIcon from "../../assets/svg/MovieIcon.js";
import TVShowIcon from "../../assets/svg/TVShowIcon.js";
import BookmarkedMedia from "../../assets/svg/BookmarkedMedia.js";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Logo from "../../assets/svg/Logo";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const location = useLocation();
  const isRegistrationPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  if (isRegistrationPage || isLoginPage) {
    return null; // Don't render the Navbar on the login page
  }

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", null, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="h-screen w-24 pb-16">
      <nav className="bg-semiDarkBlue h-full rounded-2xl py-8 flex flex-col justify-between items-center">
        <ul className="flex flex-col gap-10">
          <Link to="/trending" className="flex justify-center mb-9">
            <Logo />
          </Link>
          <Link to="/trending" className="flex justify-center">
            <TrendingIcon />
          </Link>
          <Link to="/movies" className="flex justify-center">
            <MovieIcon />
          </Link>
          <Link to="/tvshows" className="flex justify-center">
            <TVShowIcon />
          </Link>
          {user && (
            <Link to="/bookmarked" className="flex justify-center">
              <BookmarkedMedia />
            </Link>
          )}
        </ul>
        {user ? (
          <div className="w-10 h-10 cursor-pointer border-[1px] border-white rounded-full" onClick={logout}>
            <img className="rounded-full" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png" />
          </div>
        ) : (
          <Link to="/login" className="w-10 h-10 border-[1px] border-white rounded-full">
            <img className="rounded-full" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png" />
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

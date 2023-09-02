import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TrendingIcon from "../../assets/svg/TrendingIcon.js";
import MovieIcon from "../../assets/svg/MovieIcon.js";
import TVShowIcon from "../../assets/svg/TVShowIcon.js";
import BookmarkedMedia from "../../assets/svg/BookmarkedMedia.js";
import userAvatar from "../../assets/images/user-avatar.jpeg";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/svg/Logo";

const Navbar = () => {
  const { user, isLoading } = useAuth();
  const [avatarImage, setAvatarImage] = useState("");

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        const imageURL = `http://localhost:5000/images/${user.userImage}`;
        setAvatarImage(imageURL);
      }
    }
  }, [user, isLoading]);

  const location = useLocation();
  const isRegistrationPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  if (isRegistrationPage || isLoginPage) {
    return null; // Don't render the Navbar on the login page
  }

  return (
    <div className="h-20 lg:h-screen lg:w-24 lg:pb-16">
      <nav className="bg-semiDarkBlue h-full rounded-2xl px-8 lg:px-0 lg:py-8 flex lg:flex-col justify-between items-center">
        <Link to="/trending" className="flex justify-center lg:hidden">
          <Logo />
        </Link>
        <ul className="flex lg:flex-col gap-10">
          <Link to="/trending" className="flex justify-center mb-9 lg:block hidden">
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
        <Link to={user ? "/profile" : "/login"} className="w-10 h-10 border-[1px] border-white rounded-full">
          <img className="rounded-full w-full h-full" src={user?.userImage ? avatarImage : userAvatar} alt="avatar" />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;

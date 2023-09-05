import React, { useState, useEffect } from "react";
import TrendingIcon from "../../assets/svg/TrendingIcon.js";
import MovieIcon from "../../assets/svg/MovieIcon.js";
import TVShowIcon from "../../assets/svg/TVShowIcon.js";
import BookmarkedMedia from "../../assets/svg/BookmarkedMedia.js";
import userAvatar from "../../assets/images/user-avatar.jpeg";
import { useLocation, Link } from "react-router-dom";
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
    <div className="h-14 md:px-6 md:h-24 md:pt-6 lg:h-screen lg:w-32 lg:p-8 lg:pr-0">
      <nav className="bg-semiDarkBlue h-full md:rounded-2xl px-8 lg:px-0 lg:py-8 flex lg:flex-col justify-between items-center">
        <Link to="/trending" className="flex justify-center lg:hidden w-6 md:w-8">
          <Logo />
        </Link>
        <ul className="flex lg:flex-col gap-10">
          <Link to="/trending" className="flex justify-center mb-9 lg:block hidden">
            <Logo />
          </Link>
          <Link to="/trending" className="flex justify-center w-4 md:w-auto">
            <TrendingIcon />
          </Link>
          <Link to="/movies" className="flex justify-center w-4 md:w-auto">
            <MovieIcon />
          </Link>
          <Link to="/tvshows" className="flex justify-center w-4 md:w-auto">
            <TVShowIcon />
          </Link>
          {user && (
            <Link to="/bookmarked" className="flex justify-center">
              <BookmarkedMedia />
            </Link>
          )}
        </ul>
        <Link
          to={user ? "/profile" : "/login"}
          className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-[1px] border-white rounded-full"
        >
          <img className="rounded-full w-full h-full" src={user?.userImage ? avatarImage : userAvatar} alt="avatar" />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;

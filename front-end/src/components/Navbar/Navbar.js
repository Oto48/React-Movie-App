import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TrendingIcon from "../../assets/svg/TrendingIcon.js";
import MovieIcon from "../../assets/svg/MovieIcon.js";
import TVShowIcon from "../../assets/svg/TVShowIcon.js";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    console.log("ok");
    try {
      const response = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const location = useLocation();
  const isRegistrationPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  if (isRegistrationPage || isLoginPage) {
    return null; // Don't render the Navbar on the registration page
  }

  return (
    <div className="h-screen w-24 pb-16">
      <nav className="bg-semiDarkBlue h-full rounded-2xl py-8">
        <ul className="flex flex-col gap-10">
          {user && <li>Welcome, {user.username}!</li>}
          <Link to="/trending" className="flex justify-center">
            <TrendingIcon />
          </Link>
          <Link to="/movies" className="flex justify-center">
            <MovieIcon />
          </Link>
          <Link to="/tvshows" className="flex justify-center">
            <TVShowIcon />
          </Link>
          <Link to="/login" className="flex justify-center">
            <p>Login</p>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

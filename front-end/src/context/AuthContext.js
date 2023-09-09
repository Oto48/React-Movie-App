import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  const fetchUser = async () => {
    try {
      // const user = JSON.parse(localStorage.getItem("user"));
      // setUser(user);
    } catch (error) {
      console.error("unauthorized");
    } finally {
      setIsLoading(false); // Set isLoading to false regardless of success or error
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>;
};

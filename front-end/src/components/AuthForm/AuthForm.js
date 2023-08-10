import React, { useState } from "react";
import axios from "axios";
import Logo from "../../assets/svg/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Import the useAuth hook

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { setUser } = useAuth();
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate(); // Get navigation

  // Function to update form field values
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const register = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const { repeatPassword, ...dataWithoutRepeatPassword } = formData;

      try {
        // Make the API call to the backend server
        const response = await axios.post("http://localhost:5000/register", dataWithoutRepeatPassword);
        console.log(response.data);
        setFormData({
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      // Make the API call to the backend server for login
      const response = await axios.post("http://localhost:5000/login", formData, {
        withCredentials: true, // Send cookies along with the request
      });
      console.log(response.data);

      const userResponse = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });

      setUser(userResponse.data.user);
      navigate("/trending");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Function to validate the form data
  const validateForm = (data) => {
    const errors = {};

    if (!/^[A-Za-z][A-Za-z0-9]{2,}$/.test(data.username)) {
      errors.username = "Username must be at least 3 characters long and start with a letter.";
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email format.";
    }

    if (data.password.length < 3) {
      errors.password = "Password must be at least 3 characters long.";
    }

    if (data.password !== data.repeatPassword) {
      errors.repeatPassword = "Passwords do not match.";
    }

    return errors;
  };

  return (
    <div className="w-full flex flex-col items-center gap-20 mt-20">
      <Link to="/trending" className="flex justify-center">
        <Logo />
      </Link>
      <form
        onSubmit={isLogin ? login : register}
        className="p-8 bg-semiDarkBlue flex flex-col w-[400px] rounded-[20px] gap-[24px] text-[15px] font-light"
      >
        <h2 className="capitalize text-[32px]">sign up</h2>
        <div>
          {!isLogin && (
            <div className="border-b-[1px] border-greyishBlue">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="bg-semiDarkBlue focus:outline-none m-[16px]"
              />
            </div>
            // {formErrors.username && <p>{formErrors.username}</p>}
          )}

          <div className="border-b-[1px] border-greyishBlue">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="bg-semiDarkBlue focus:outline-none m-[16px]"
            />
          </div>
          {formErrors.email && <p>{formErrors.email}</p>}

          <div className="border-b-[1px] border-greyishBlue">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-semiDarkBlue focus:outline-none m-[16px]"
            />
          </div>
          {formErrors.password && <p>{formErrors.password}</p>}

          {!isLogin && (
            <div className="border-b-[1px] border-greyishBlue mb-[16px]">
              <input
                type="password"
                name="repeatPassword"
                placeholder="Repeat password"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="bg-semiDarkBlue focus:outline-none m-[16px]"
              />
            </div>
            // {formErrors.repeatPassword && <p>{formErrors.repeatPassword}</p>}
          )}
        </div>
        <button type="submit" className="bg-red py-3 rounded-md hover:bg-white hover:text-semiDarkBlue">
          Create an account
        </button>
        <div className="flex gap-2.5 justify-center">
          <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
          <Link to={isLogin ? "/register" : "/login"}>
            <h2 className="capitalize text-red">{isLogin ? "sign up" : "login"}</h2>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

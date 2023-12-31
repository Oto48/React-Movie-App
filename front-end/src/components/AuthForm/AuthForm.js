import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../assets/svg/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [invalid, setInvalid] = useState(false);
  const { user, setUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate("/trending");
      }
    }
  }, [user, isLoading, navigate]);

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
        await axios.post("http://localhost:5000/register", dataWithoutRepeatPassword);
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
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (!Object.keys(errors).length) {
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
        setInvalid(true);
        console.error("Error during login:", error);
      }
    }
  };

  const resetErrors = () => {
    setFormErrors({});
    setInvalid(false);
  };

  // Function to validate the form data
  const validateForm = (data) => {
    const errors = {};

    if (!/^[A-Za-z][A-Za-z0-9]{2,}$/.test(data.username) && !isLogin) {
      errors.username = "Invalid Username";
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid Email";
    }

    if (data.password.length < 3) {
      errors.password = "Invalid Password";
    }

    if (data.password !== data.repeatPassword && !isLogin) {
      errors.repeatPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className={`w-full flex flex-col items-center gap-${invalid ? 10 : 20} mt-12 md:mt-16 lg:mt-20`}>
      <Link to="/trending" className="flex justify-center">
        <Logo />
      </Link>
      {invalid && <p className="text-red text-lg">Invalid Email or Password</p>}
      <form
        onSubmit={isLogin ? login : register}
        className="p-8 bg-semiDarkBlue flex flex-col w-80 small:w-[400px] rounded-[20px] gap-[24px] text-[15px] font-light"
      >
        <h2 className="capitalize text-[32px]">{isLogin ? "login" : "sign up"}</h2>
        <div>
          {!isLogin && (
            <div className="border-b-[1px] border-greyishBlue flex items-center">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="bg-semiDarkBlue focus:outline-none m-[16px] min-w-[50%] flex-1"
              />
              {formErrors.username && <p className="flex-1 text-red text-[13px]">{formErrors.username}</p>}
            </div>
          )}

          <div className="border-b-[1px] border-greyishBlue flex items-center">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="bg-semiDarkBlue focus:outline-none m-[16px] min-w-[50%] flex-1"
            />
            {formErrors.email && <p className="flex-1 text-red text-[13px]">{formErrors.email}</p>}
          </div>

          <div className="border-b-[1px] border-greyishBlue flex items-center">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-semiDarkBlue focus:outline-none m-[16px] min-w-[50%] flex-1"
            />
            {formErrors.password && <p className="flex-1 text-red text-[13px]">{formErrors.password}</p>}
          </div>

          {!isLogin && (
            <div className="border-b-[1px] border-greyishBlue mb-[16px] flex items-center">
              <input
                type="password"
                name="repeatPassword"
                placeholder="Repeat password"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="bg-semiDarkBlue focus:outline-none m-[16px] min-w-[40%] flex-1"
              />
              {formErrors.repeatPassword && <p className="flex-1 text-red text-[13px]">{formErrors.repeatPassword}</p>}
            </div>
          )}
        </div>
        <button type="submit" className="bg-red py-3 rounded-md hover:bg-white hover:text-semiDarkBlue">
          {isLogin ? "Login to your account" : "Create an account"}
        </button>
        <div className="flex gap-2.5 justify-center">
          <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
          <Link to={isLogin ? "/register" : "/login"} onClick={() => resetErrors()}>
            <h2 className="capitalize text-red">{isLogin ? "sign up" : "login"}</h2>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

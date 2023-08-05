import React, { useState } from "react";
import axios from "axios";
import Logo from "../../assets/svg/Logo";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Function to update form field values
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const { repeatPassword, ...dataWithoutRepeatPassword } = formData;
      console.log(dataWithoutRepeatPassword);

      try {
        // Make the API call to the backend server
        const response = await axios.post("http://localhost:5000/register", dataWithoutRepeatPassword);
        console.log(response.data);
      } catch (error) {
        console.error("Error during registration:", error);
      }
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
      <Logo />
      <form onSubmit={handleSubmit} className="p-8 bg-semiDarkBlue flex flex-col w-[400px] rounded-[20px] font-light">
        <p className="capitalize">sign up</p>
        <div className="border-b-[1px] border-greyishBlue">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="bg-semiDarkBlue focus:outline-none mb-[18px]"
          />
        </div>
        {formErrors.username && <p>{formErrors.username}</p>}

        <div className="border-b-[1px] border-greyishBlue">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="bg-semiDarkBlue focus:outline-none my-[18px]"
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
            className="bg-semiDarkBlue focus:outline-none my-[18px]"
          />
        </div>
        {formErrors.password && <p>{formErrors.password}</p>}

        <div className="border-b-[1px] border-greyishBlue">
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
            value={formData.repeatPassword}
            onChange={handleChange}
            className="bg-semiDarkBlue focus:outline-none my-[18px]"
          />
        </div>
        {formErrors.repeatPassword && <p>{formErrors.repeatPassword}</p>}
        <button type="submit">Create an account</button>
      </form>
    </div>
  );
};

export default AuthForm;

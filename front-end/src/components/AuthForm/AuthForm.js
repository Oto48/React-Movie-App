import React, { useState } from "react";
import axios from "axios";

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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      {formErrors.username && <p>{formErrors.username}</p>}

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      {formErrors.email && <p>{formErrors.email}</p>}
      <br />

      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      {formErrors.password && <p>{formErrors.password}</p>}

      <label>
        Repeat Password:
        <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} />
      </label>
      {formErrors.repeatPassword && <p>{formErrors.repeatPassword}</p>}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AuthForm;

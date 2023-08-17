import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../assets/svg/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      fetchImage();
    }
  }, [user]);

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const newImageName = `${imageFile.name.split(".")[0]}-${user.username}.${imageFile.name.split(".")[1]}`;
      const formData = new FormData();
      formData.append("image", imageFile, newImageName);

      try {
        await axios.post("http://localhost:5000/upload", formData, {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const fetchImage = async () => {
    try {
      const imageURL = `http://localhost:5000/images/${user.userImage}`;
      setSelectedImage(imageURL);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <img src={selectedImage} alt="Profile" />
    </div>
  );
};

export default Profile;

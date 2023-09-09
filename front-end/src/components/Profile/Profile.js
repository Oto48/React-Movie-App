import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Logo from "../../assets/svg/Logo";
import userAvatar from "../../assets/images/user-avatar.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const [avatarImage, setAvatarImage] = useState("");
  const { user, setUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageURL = `https://react-movie-app-1fej.onrender.com/images/${user.userImage}`;
        setAvatarImage(imageURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (!isLoading) {
      if (user) {
        fetchImage();
      }
      if (!user) {
        navigate("/login");
      }
    }
  }, [user, isLoading, navigate]);

  const imageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const newImageName = `${imageFile.name.split(".")[0]}-${user.username}.${imageFile.name.split(".")[1]}`;
      const formData = new FormData();
      formData.append("image", imageFile, newImageName);

      try {
        await axios.post("https://react-movie-app-1fej.onrender.com/upload", formData, {
          withCredentials: true,
        });

        const updatedUser = { ...user, userImage: newImageName };
        setUser(updatedUser);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post("https://react-movie-app-1fej.onrender.com/logout", null, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/trending");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={`w-full flex flex-col items-center gap-20 mt-20`}>
      <Link to="/trending" className="flex justify-center">
        <Logo />
      </Link>
      <div className="p-8 bg-semiDarkBlue text-3xl flex flex-col w-[400px] rounded-[20px] gap-[24px]">
        {user && <p className="capitalize flex justify-center">{user.username}</p>}
        <div className="flex justify-center">
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={imageUpload} />
          <label htmlFor="fileInput" className="flex w-60 h-60 relative">
            <img
              src={user?.userImage ? avatarImage : userAvatar}
              className="rounded-full w-full h-full border-2"
              alt="avatar"
            />
            <div
              className="w-full h-full rounded-full opacity-0 hover:opacity-10 bg-white absolute cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            ></div>
          </label>
        </div>
      </div>
      <button
        className="w-[400px] bg-red py-3 rounded-md capitalize hover:bg-white hover:text-semiDarkBlue"
        onClick={logout}
      >
        log out
      </button>
    </div>
  );
};

export default Profile;

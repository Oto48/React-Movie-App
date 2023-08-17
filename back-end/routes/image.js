const express = require("express");
const multer = require("multer");

const User = require("../models/user");
const { verifyToken } = require("../utils/token");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // Set the destination folder
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName); // Set the file name
  },
});

// Accept images only
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter, // Use the image filter
});

router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Check if the uploaded image's reference matches the user's image
      const uploadedImageReference = req.file.filename;
      if (user.userImage === uploadedImageReference) {
        return res
          .status(400)
          .json({ message: "Image already set as avatar." });
      }

      // Store the uploaded image reference as the user's new image
      user.userImage = uploadedImageReference;
      await user.save();

      res.status(200).json({ message: "Image uploaded successfully." });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

module.exports = router;

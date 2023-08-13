const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/token");
const User = require("../models/user");

router.post("/bookmark/:mediaId/:isMovie", verifyToken, async (req, res) => {
  try {
    const { mediaId, isMovie } = req.params;
    const userId = req.user.userId;
    const isMovieFlag = isMovie !== "undefined";

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the media ID is already in the bookmarkedMedia array
    const isBookmarked = user.bookmarkedMedia.some(
      (bookmark) => bookmark.mediaId === parseInt(mediaId)
    );

    if (isBookmarked) {
      return res.status(409).json({ message: "Movie already bookmarked." });
    }

    // Add the media ID to the bookmarkedMovies array
    user.bookmarkedMedia.push({
      mediaId: parseInt(mediaId),
      isMovie: isMovieFlag,
    });
    await user.save();

    res.status(200).json({ message: "Movie bookmarked successfully." });
  } catch (error) {
    console.error("Error bookmarking movie:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.delete("/bookmark/:mediaId", verifyToken, async (req, res) => {
  try {
    const { mediaId } = req.params;
    const userId = req.user.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Remove the specified media ID from the bookmarkedMedia array
    user.bookmarkedMedia = user.bookmarkedMedia.filter(
      (bookmark) => !(bookmark.mediaId === parseInt(mediaId))
    );

    await user.save();

    res
      .status(200)
      .json({ message: "Media removed from bookmarks successfully." });
  } catch (error) {
    console.error("Error removing media from bookmarks:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;

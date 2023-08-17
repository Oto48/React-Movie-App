const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  isValidUsername,
  isValidEmail,
  isValidPassword,
} = require("../utils/validations");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidUsername,
      message:
        "Invalid username format. username must have at least 3 characters.",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidEmail,
      message: "Invalid email format.",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: isValidPassword,
      message:
        "Invalid password format. Password must have at least 3 characters.",
    },
  },
  bookmarkedMedia: [
    {
      mediaId: {
        type: Number,
        required: true,
      },
      isMovie: {
        type: Boolean,
        required: true,
      },
    },
  ],
  userImage: {
    type: String,
  },
});

// Pre-save hook to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

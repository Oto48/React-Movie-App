const jwt = require("jsonwebtoken");

// Helper function to generate a JWT token
const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, "mysecretkey123");
  return token;
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const decodedToken = jwt.verify(token, "mysecretkey123");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};

module.exports = { generateToken, verifyToken };

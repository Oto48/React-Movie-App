const mongoose = require("mongoose");

const mongoDBUrl = "mongodb://localhost:27017/movie_app";

// Return a promise that resolves when the connection is open
const connectToDatabase = () => {
  return mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDatabase;

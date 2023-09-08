const mongoose = require("mongoose");

const mongoDBUrl =
  "mongodb+srv://user:user123@cluster0.djbyzkh.mongodb.net/?retryWrites=true&w=majority";

// Return a promise that resolves when the connection is open
const connectToDatabase = () => {
  return mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDatabase;

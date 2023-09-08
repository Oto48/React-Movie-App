const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const port = 5000;

const connectToDatabase = require("./db/connection");
const authRoutes = require("./routes/auth");
const mediaRoutes = require("./routes/media");
const imageRoutes = require("./routes/image");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // Use the cors middleware
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", mediaRoutes);
app.use("/", imageRoutes);

// Serve static files from the "images" directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Start the server and listen on the specified port
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on te port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();

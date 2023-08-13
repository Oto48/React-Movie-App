const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDatabase = require("./db/connection");
const authRoutes = require("./routes/auth");
const mediaRoutes = require("./routes/media");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // Use the cors middleware
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", mediaRoutes);

// Start the server and listen on the specified port
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();

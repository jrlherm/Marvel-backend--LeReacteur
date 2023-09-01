require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the DB
// mongoose.connect(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });

// Connect to cloudinary
cloudinary.config({
  cloud_name: "ddkgnxcot",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const characterRoutes = require("./routes/characters");
const comicRoutes = require("./routes/comics");
const userRoutes = require("./routes/users");
app.use(characterRoutes);
app.use(comicRoutes);
app.use(userRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Marvel home page" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});

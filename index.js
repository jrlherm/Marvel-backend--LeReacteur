require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// Connect to the DB
mongoose.connect(process.env.MONGODB_URI);

// HOME ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Marvel home page" });
});

const characterRoutes = require("./routes/characters");
const comicRoutes = require("./routes/comics");
const userRoutes = require("./routes/users");
app.use(characterRoutes);
app.use(comicRoutes);
app.use(userRoutes);

app.get("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});

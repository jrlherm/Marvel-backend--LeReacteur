const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Marvel home page" });
});

// ROUTE TO GET ALL COMICS
app.get("/comics", async (req, res) => {
  const { title } = req.query;
  const { skip } = req.query;
  const { limit } = req.query;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&skip=${skip}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching comics:", error);
    res.status(500).json({ error: "An error occurred while fetching comics" });
  }
});

// ROUTE TO GET DETAILS OF A COMIC
app.get("/comic/:comicId", async (req, res) => {
  const comicId = req.params.comicId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching comic detail:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching comic detail" });
  }
});

// Get a list of comics containing a specific character
app.get("/comics/:characterId", async (req, res) => {
  const characterId = req.params.characterId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching comics for character:", error);
    res.status(500).json({ error: "An error occurred while fetching comics" });
  }
});

// ROUTE TO GET ALL CHARACTERS
app.get("/characters", async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching characters" });
  }
});

// ROUTE TO GET DETAILS OF A CHARACTER
app.get("/characters/:characterId", async (req, res) => {
  const characterId = req.params.characterId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching character detail:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching character detail" });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "this route does not exist" });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});

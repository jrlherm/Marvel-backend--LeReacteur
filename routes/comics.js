const express = require("express");
const router = express.Router();

// ROUTE TO GET ALL COMICS
router.get("/comics", async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 100;
  const title = req.query.title || "";

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?limit=${limit}&skip=${skip}&title=${title}&apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching comics:", error);
    res.status(500).json({ error: "An error occurred while fetching comics" });
  }
});

// ROUTE TO GET DETAILS OF A COMIC
router.get("/comic/:comicId", async (req, res) => {
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
router.get("/comics/:characterId", async (req, res) => {
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

module.exports = router;

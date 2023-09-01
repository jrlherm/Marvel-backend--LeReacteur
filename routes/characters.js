const express = require("express");
const router = express.Router();
const axios = require("axios");

// ROUTE TO GET ALL CHARACTERS
router.get("/characters", async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 20; // Adjust the limit as needed
  const name = req.query.name || "";

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuroouter.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
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
router.get("/characters/:characterId", async (req, res) => {
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

module.exports = router;

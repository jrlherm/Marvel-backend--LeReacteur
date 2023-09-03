const express = require("express");
const router = express.Router();
const axios = require("axios");

const User = require("../models/Users");

router.get("/favoritesCharacters", async (req, res) => {
  const userToken = req.query.userToken;

  try {
    const user = await User.findOne({ token: userToken }).populate(
      "favoritesCharacters"
    );
    if (user) {
      res.status(200).json({ favorites: user.favoritesCharacters });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting character favorites:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting character favorites" });
  }
});

router.post("/characters/add-favorite", async (req, res) => {
  const userToken = req.body.userToken;
  const favoriteCharacterId = req.body.favoriteCharacterId;

  try {
    const user = await User.findOne({ token: userToken });
    if (user) {
      user.favoritesCharacters.push(favoriteCharacterId);
      await user.save();
      res
        .status(200)
        .json({ message: "Favorite character added successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error adding favorite character :", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding favorite character " });
  }
});

router.delete("/remove-favorite", async (req, res) => {
  const userToken = req.query.userToken;
  const favoriteCharacterId = req.query.favoriteCharacterId;

  try {
    const user = await User.findOne({ token: userToken });
    if (user) {
      const index = user.favoritesCharacters.indexOf(favoriteCharacterId);
      if (index !== -1) {
        user.favoritesCharacters.splice(index, 1);
        await user.save();
        res
          .status(200)
          .json({ message: "Favorite character removed successfully" });
      } else {
        res.status(404).json({ error: "Favorite character  not found" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error removing favorite character :", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing character" });
  }
});

module.exports = router;

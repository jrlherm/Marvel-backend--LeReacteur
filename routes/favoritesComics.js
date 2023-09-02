const express = require("express");
const router = express.Router();
const axios = require("axios");

const User = require("../models/Users");

router.get("/favoritesComics", async (req, res) => {
  const userToken = req.query.userToken;

  try {
    const user = await User.findOne({ token: userToken }).populate(
      "favoritesComics"
    );

    if (user) {
      res.status(200).json({ favorites: user.favoritesComics });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting comic favorites:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting comic favorites" });
  }
});

// Ajouter un comic en favori pour un utilisateur
router.post("/comics/add-favorite", async (req, res) => {
  const userToken = req.body.userToken;
  const favoriteComicId = req.body.favoriteComicId;

  try {
    const user = await User.findOne({ token: userToken });
    if (user) {
      user.favoritesComics.push(favoriteComicId);
      await user.save();
      res.status(200).json({ message: "Favorite Comic added successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error adding comic favorite:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding comic favorite" });
  }
});

// Supprimer un comic des favoris d'un utilisateur
router.delete("/comics/favorites", async (req, res) => {
  const userToken = req.query.userToken;
  const favoriteComicId = req.query.favoriteComicId;

  try {
    const user = await User.findOne({ token: userToken });
    if (user) {
      const index = user.favoritesComics.indexOf(favoriteComicId);
      if (index !== -1) {
        user.favoritesComics.splice(index, 1);
        await user.save();
        res
          .status(200)
          .json({ message: "Comic favorite removed successfully" });
      } else {
        res.status(404).json({ error: "Comic favorite not found" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error removing comic favorite:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing comic favorite" });
  }
});

module.exports = router;

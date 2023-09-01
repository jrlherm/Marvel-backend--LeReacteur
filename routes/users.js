const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const fileUpload = require("express-fileupload");
const convertToBase64 = require("../utils/convertToBase64");

const cloudinary = require("cloudinary").v2;

// Import des modeles
const User = require("../models/Users");

router.post("/signup", fileUpload(), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(409).json({ message: "Email already has an account." });
    } else if (req.body.email && req.body.password && req.body.username) {
      const token = uid2(64);
      const salt = uid2(64);
      const hash = SHA256(req.body.password + salt).toString(encBase64);

      const newUser = new User({
        email: req.body.email,
        token: token,
        hash: hash,
        salt: salt,
        account: {
          username: req.body.username,
        },
        acceptCGU: req.body.acceptCGU,
      });

      if (req.files?.avatar) {
        const result = await cloudinary.uploader.upload(
          convertToBase64(req.files.avatar),
          {
            folder: `api/marvel/users/${newUser._id}`,
            public_id: "avatar",
          }
        );
        newUser.account.avatar = result;
      }

      await newUser.save();
      console.log(newUser);
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        token: newUser.token,
        account: newUser.account,
      });
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("Received email: ", req.body.email);
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("Found user: ", user);

    if (user) {
      if (
        SHA256(req.body.password + user.salt).toString(encBase64) === user.hash
      ) {
        res.status(200).json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

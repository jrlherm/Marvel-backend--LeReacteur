const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    required: true,
    type: String,
  },
  account: {
    username: {
      unique: true,
      required: true,
      type: String,
    },
    avatar: Object,
  },
  favoritesCharacters: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  favoritesComics: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  acceptCGU: Boolean,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;

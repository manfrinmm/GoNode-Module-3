const mongoose = require("mongoose");

const Purchase = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad",
    required: true
  },
  author: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Purchase", Purchase);

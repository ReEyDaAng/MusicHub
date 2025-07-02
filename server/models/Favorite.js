const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: String,
  trackId: String,
  title: String,
  artist: String,
  previewUrl: String
});

module.exports = mongoose.model('Favorite', favoriteSchema);
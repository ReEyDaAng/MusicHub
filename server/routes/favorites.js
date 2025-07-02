const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

router.get('/', async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user.id });
  res.json(favorites);
});

router.post('/', async (req, res) => {
  const { trackId, title, artist, previewUrl } = req.body;
  const favorite = new Favorite({
    userId: req.user.id,
    trackId, title, artist, previewUrl
  });
  await favorite.save();
  res.status(201).json(favorite);
});

router.delete('/:id', async (req, res) => {
  await Favorite.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.status(204).end();
});

module.exports = router;
const express = require('express');
const axios = require('axios');
const router = express.Router();

let accessToken = '';

async function refreshToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenRes = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
    {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  accessToken = tokenRes.data.access_token;
}

// маршрут пошуку
router.get('/search', async (req, res, next) => {
  try {
    if (!accessToken) await refreshToken();
    const { q } = req.query;
    const spotifyRes = await axios.get(
      'https://api.spotify.com/v1/search',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { q, type: 'track', limit: 10 }
      }
    );
    res.json(spotifyRes.data.tracks.items);
  } catch (err) {
    next(err);
  }
});

router.get('/latest', async (req, res, next) => {
  try {
    if (!accessToken) await refreshToken();
    const spotifyRes = await axios.get(
      'https://api.spotify.com/v1/browse/new-releases',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { limit: 12, country: 'US' }
      }
    );
    // Повертаємо список альбомів (albums.items)
    res.json(spotifyRes.data.albums.items);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
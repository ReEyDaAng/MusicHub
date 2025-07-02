const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorites');
const spotifyRoutes = require('./routes/spotify');
const { verifyToken } = require('./middleware/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.path}`);
  next();
});
app.use('/api/auth', authRoutes);
app.use('/api/favorites', verifyToken, favoriteRoutes);
app.use('/api/tracks', spotifyRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

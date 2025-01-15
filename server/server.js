const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const comicsRouter = require('./routes/comics');
const seriesRouter = require('./routes/series');
const charactersRouter = require('./routes/characters'); // Ensure this path is correct

app.use(cors()); // Enable CORS

// Marvel API keys
const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

// Log the environment variables to ensure they are loaded correctly
console.log('MARVEL_PUBLIC_KEY:', MARVEL_PUBLIC_KEY);
console.log('MARVEL_PRIVATE_KEY:', MARVEL_PRIVATE_KEY);

// Function to generate ts, hash, and apikey
const generateAuthParams = () => {
  const ts = Date.now().toString(); // Use current timestamp
  const hash = crypto
    .createHash('md5')
    .update(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY)
    .digest('hex');
  return { ts, apikey: MARVEL_PUBLIC_KEY, hash };
};

// Use the routers
app.use('/api/comics', comicsRouter);
app.use('/api/series', seriesRouter);
app.use('/api/characters', charactersRouter); // Use the characters router

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const comicsRouter = require('./routers/comics'); // Ensure this path is correct
const seriesRouter = require('./routers/series'); // Ensure this path is correct
const charactersRouter = require('./routers/characters'); // Ensure this path is correct

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

// Search endpoint
app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  const { ts, apikey, hash } = generateAuthParams();
  const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public';

  try {
    const [comicsResponse, seriesResponse, charactersResponse] = await Promise.all([
      axios.get(`${MARVEL_API_URL}/comics`, { params: { ts, apikey, hash, titleStartsWith: query } }),
      axios.get(`${MARVEL_API_URL}/series`, { params: { ts, apikey, hash, titleStartsWith: query } }),
      axios.get(`${MARVEL_API_URL}/characters`, { params: { ts, apikey, hash, nameStartsWith: query } }),
    ]);

    const results = [
      ...comicsResponse.data.data.results,
      ...seriesResponse.data.data.results,
      ...charactersResponse.data.data.results,
    ];

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Search endpoint
app.get('/api/search', async(req,res)=> {
const {query} = req.query;
const {ts,apikey,hash} = generateAuthParams();
const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public';
});

// Use the routers
app.use('/api/comics', comicsRouter);
app.use('/api/series', seriesRouter);
app.use('/api/characters', charactersRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
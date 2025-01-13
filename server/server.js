const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

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

// Endpoint to fetch Marvel characters
app.get('/api/characters', async (req, res) => {
  const { ts, apikey, hash } = generateAuthParams();
  const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public/characters';

  // Log the final URL for debugging
  const finalUrl = `${MARVEL_API_URL}?ts=${ts}&apikey=${apikey}&hash=${hash}`;
  console.log('Request URL:', finalUrl);  // Log the complete URL being sent to the Marvel API

  try {
    const response = await axios.get(MARVEL_API_URL, {
      params: { ts, apikey, hash },
    });

    // Check if the response data is valid and contains results
    if (response.data && response.data.data && response.data.data.results) {
      console.log('Marvel API response:', response.data); // Add logging for API response
      res.json(response.data);
    } else {
      throw new Error('No characters found in response');
    }
  } catch (error) {
    console.error('Error fetching Marvel characters:', error.message);

    // If error has a response, log the response data
    if (error.response) {
      console.error('Marvel API Error Response:', error.response.data);
    }

    // Return the error message in the response
    res.status(500).json({ error: error.message });
  }
});
// app get comics 
app.get('/api/comics',async(req,res)=> {
  const {ts,apikey,hash} = generateAuthParams();
  const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public/comics';
  try {
    const response = await axios.get(MARVEL_API_URL,{
      params: {ts,apikey,hash},
    });
    console.log("Marvel comics Response:",response.data);
    res.json(response.data);
  } catch(err){
    console.log('Error fetching Marvel comics:',err.message);
    res.status(500).json({error:err.message});
  }
});

// app get series

// Endpoint to fetch Marvel series
app.get('/api/series', async (req, res) => {
  const { ts, apikey, hash } = generateAuthParams();
  const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public/series';

  try {
    const response = await axios.get(MARVEL_API_URL, {
      params: { ts, apikey, hash },
    });
    console.log("Marvel series Response:", response.data);
    res.json(response.data);
  } catch (err) {
    console.log('Error fetching Marvel series:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
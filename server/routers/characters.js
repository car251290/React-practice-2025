const express = require('express');
const axios = require('axios');
const router = express.Router();
const { generateAuthParams } = require('../utils/auth');

// Fetches lists of characters
router.get('/', async (req, res) => {
  const { ts, apikey, hash } = generateAuthParams();
  const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public/characters';

  try {
    const response = await axios.get(MARVEL_API_URL, {
      params: { ts, apikey, hash },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetches details of a specific character
router.get('/:characterId', async (req, res) => {
  const { characterId } = req.params;
  const { ts, apikey, hash } = generateAuthParams();
  const MARVEL_API_URL = `https://gateway.marvel.com/v1/public/characters/${characterId}`;

  try {
    const response = await axios.get(MARVEL_API_URL, {
      params: { ts, apikey, hash },
    });
    console.log(`Marvel character details Response for characterId ${characterId}:`, response.data);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
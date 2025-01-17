const express = require('express');
const axios = require('axios');
const router = express.Router();
const { generateAuthParams } = require('../utils/auth');

router.get('/', async (req, res) => {
  const { ts, apikey, hash } = generateAuthParams();
  const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public/comics';

  try {
    const response = await axios.get(MARVEL_API_URL, {
      params: { ts, apikey, hash },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:comicId/stories', async (req, res) => {
  const { comicId } = req.params;
  const { ts, apikey, hash } = generateAuthParams();
  const MARVEL_API_URL = `https://gateway.marvel.com/v1/public/comics/${comicId}/stories`;

  try {
    const response = await axios.get(MARVEL_API_URL, {
      params: { ts, apikey, hash },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:comicId/characters', async (req, res) => {
  const { comicId } = req.params;
  const { ts, apikey, hash } = generateAuthParams();
  const MARVEL_API_URL = `https://gateway.marvel.com/v1/public/comics/${comicId}/characters`;

  try {
    const response = await axios.get(MARVEL_API_URL, {
      params: { ts, apikey, hash },
    });
    console.log(`Marvel comic characters Response for comicId ${comicId}:`, response.data); // Log the response
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { generateAuthParams } = require('../utils/auth');

router.get('/', async (req, res) => {
  const { ts, apikey, hash } = generateAuthParams();
  const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public/series';

  try {
    const response = await axios.get(MARVEL_API_URL, {
      params: { ts, apikey, hash },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
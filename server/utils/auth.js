const crypto = require('crypto');
require('dotenv').config();

const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

const generateAuthParams = () => {
  const ts = Date.now().toString(); // Use current timestamp
  const hash = crypto
    .createHash('md5')
    .update(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY)
    .digest('hex');
  return { ts, apikey: MARVEL_PUBLIC_KEY, hash };
};

module.exports = { generateAuthParams };
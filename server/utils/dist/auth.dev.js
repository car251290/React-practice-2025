"use strict";

var crypto = require('crypto');

require('dotenv').config();

var MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
var MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

var generateAuthParams = function generateAuthParams() {
  var ts = Date.now().toString(); // Use current timestamp

  var hash = crypto.createHash('md5').update(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY).digest('hex');
  return {
    ts: ts,
    apikey: MARVEL_PUBLIC_KEY,
    hash: hash
  };
};

module.exports = {
  generateAuthParams: generateAuthParams
};
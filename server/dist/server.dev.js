"use strict";

var express = require('express');

var axios = require('axios');

var crypto = require('crypto');

var cors = require('cors');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 3001;

var comicsRouter = require('./routes/comics');

var seriesRouter = require('./routes/series');

var charactersRouter = require('./routes/characters'); // Ensure this path is correct


app.use(cors()); // Enable CORS
// Marvel API keys

var MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
var MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY; // Log the environment variables to ensure they are loaded correctly

console.log('MARVEL_PUBLIC_KEY:', MARVEL_PUBLIC_KEY);
console.log('MARVEL_PRIVATE_KEY:', MARVEL_PRIVATE_KEY); // Function to generate ts, hash, and apikey

var generateAuthParams = function generateAuthParams() {
  var ts = Date.now().toString(); // Use current timestamp

  var hash = crypto.createHash('md5').update(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY).digest('hex');
  return {
    ts: ts,
    apikey: MARVEL_PUBLIC_KEY,
    hash: hash
  };
}; // Use the routers


app.use('/api/comics', comicsRouter);
app.use('/api/series', seriesRouter);
app.use('/api/characters', charactersRouter); // Use the characters router
// Start server

app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
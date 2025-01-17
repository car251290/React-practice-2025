"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var express = require('express');

var axios = require('axios');

var crypto = require('crypto');

var cors = require('cors');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 3001;

var comicsRouter = require('./routers/comics'); // Ensure this path is correct


var seriesRouter = require('./routers/series'); // Ensure this path is correct


var charactersRouter = require('./routers/characters'); // Ensure this path is correct


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
}; // Search endpoint


app.get('/api/search', function _callee(req, res) {
  var query, _generateAuthParams, ts, apikey, hash, MARVEL_API_URL, _ref, _ref2, comicsResponse, seriesResponse, charactersResponse, results;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = req.query.query;
          _generateAuthParams = generateAuthParams(), ts = _generateAuthParams.ts, apikey = _generateAuthParams.apikey, hash = _generateAuthParams.hash;
          MARVEL_API_URL = 'https://gateway.marvel.com/v1/public';
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(Promise.all([axios.get("".concat(MARVEL_API_URL, "/comics"), {
            params: {
              ts: ts,
              apikey: apikey,
              hash: hash,
              titleStartsWith: query
            }
          }), axios.get("".concat(MARVEL_API_URL, "/series"), {
            params: {
              ts: ts,
              apikey: apikey,
              hash: hash,
              titleStartsWith: query
            }
          }), axios.get("".concat(MARVEL_API_URL, "/characters"), {
            params: {
              ts: ts,
              apikey: apikey,
              hash: hash,
              nameStartsWith: query
            }
          })]));

        case 6:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 3);
          comicsResponse = _ref2[0];
          seriesResponse = _ref2[1];
          charactersResponse = _ref2[2];
          results = [].concat(_toConsumableArray(comicsResponse.data.data.results), _toConsumableArray(seriesResponse.data.data.results), _toConsumableArray(charactersResponse.data.data.results));
          res.json(results);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](3);
          res.status(500).json({
            error: _context.t0.message
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 15]]);
}); // Search endpoint

app.get('/api/search', function _callee2(req, res) {
  var query, _generateAuthParams2, ts, apikey, hash, MARVEL_API_URL;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = req.query.query;
          _generateAuthParams2 = generateAuthParams(), ts = _generateAuthParams2.ts, apikey = _generateAuthParams2.apikey, hash = _generateAuthParams2.hash;
          MARVEL_API_URL = 'https://gateway.marvel.com/v1/public';

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Use the routers

app.use('/api/comics', comicsRouter);
app.use('/api/series', seriesRouter);
app.use('/api/characters', charactersRouter); // Start server

app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
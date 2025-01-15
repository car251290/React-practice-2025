"use strict";

var express = require('express');

var axios = require('axios');

var router = express.Router();

var _require = require('../utils/auth'),
    generateAuthParams = _require.generateAuthParams; // Fetches lists of characters


router.get('/', function _callee(req, res) {
  var _generateAuthParams, ts, apikey, hash, MARVEL_API_URL, response;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _generateAuthParams = generateAuthParams(), ts = _generateAuthParams.ts, apikey = _generateAuthParams.apikey, hash = _generateAuthParams.hash;
          MARVEL_API_URL = 'https://gateway.marvel.com/v1/public/characters';
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(axios.get(MARVEL_API_URL, {
            params: {
              ts: ts,
              apikey: apikey,
              hash: hash
            }
          }));

        case 5:
          response = _context.sent;
          res.json(response.data);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          res.status(500).json({
            error: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}); // Fetches details of a specific character

router.get('/:characterId', function _callee2(req, res) {
  var characterId, _generateAuthParams2, ts, apikey, hash, MARVEL_API_URL, response;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          characterId = req.params.characterId;
          _generateAuthParams2 = generateAuthParams(), ts = _generateAuthParams2.ts, apikey = _generateAuthParams2.apikey, hash = _generateAuthParams2.hash;
          MARVEL_API_URL = "https://gateway.marvel.com/v1/public/characters/".concat(characterId);
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(axios.get(MARVEL_API_URL, {
            params: {
              ts: ts,
              apikey: apikey,
              hash: hash
            }
          }));

        case 6:
          response = _context2.sent;
          console.log("Marvel character details Response for characterId ".concat(characterId, ":"), response.data);
          res.json(response.data);
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](3);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 11]]);
});
module.exports = router;
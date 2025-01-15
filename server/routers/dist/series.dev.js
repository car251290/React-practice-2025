"use strict";

var express = require('express');

var axios = require('axios');

var router = express.Router();

var _require = require('../utils/auth'),
    generateAuthParams = _require.generateAuthParams;

router.get('/', function _callee(req, res) {
  var _generateAuthParams, ts, apikey, hash, MARVEL_API_URL, response;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _generateAuthParams = generateAuthParams(), ts = _generateAuthParams.ts, apikey = _generateAuthParams.apikey, hash = _generateAuthParams.hash;
          MARVEL_API_URL = 'https://gateway.marvel.com/v1/public/series';
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
});
module.exports = router;
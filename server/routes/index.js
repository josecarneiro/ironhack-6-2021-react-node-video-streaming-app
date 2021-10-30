'use strict';

const express = require('express');
const router = express.Router();
const Imagekit = require('imagekit');

const imagekit = new Imagekit({
  urlEndpoint: 'https://ik.imagekit.io/mt7m0yaczq1',
  privateKey: '',
  publicKey: 'public_E+GMs/gXx1yMKtlWGwOHLLKBmFY='
});

router.get('/file-upload-authentication', (req, res, next) => {
  const credentials = imagekit.getAuthenticationParameters();
  res.json(credentials);
});

module.exports = router;

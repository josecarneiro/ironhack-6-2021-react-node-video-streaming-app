'use strict';

const express = require('express');
const router = express.Router();
const Imagekit = require('imagekit');

const imagekit = new Imagekit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  privateKey: process.env.IMAGEKIT_SECRET_API_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_API_KEY
});

router.get('/file-upload-authentication', (req, res, next) => {
  const credentials = imagekit.getAuthenticationParameters();
  res.json(credentials);
});

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const Imagekit = require('imagekit');
const User = require('./../models/user');

const imagekit = new Imagekit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  privateKey: process.env.IMAGEKIT_SECRET_API_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_API_KEY
});

router.get('/file-upload-authentication', (req, res, next) => {
  const credentials = imagekit.getAuthenticationParameters();
  res.json(credentials);
});

router.patch('/settings', async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const router = new Router();

router.post('/sign-up', async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHashAndSalt: hash,
      role: role === 'creator' ? 'creator' : 'viewer'
      // role: role || 'viewer'
    });
    req.session.userId = user._id;
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/sign-in', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("There's no user with that email.");
    }
    const result = await bcryptjs.compare(password, user.passwordHashAndSalt);
    if (!result) {
      throw new Error('Wrong password.');
    }
    req.session.userId = user._id;
    res.redirect('/authentication/me');
  } catch (error) {
    next(error);
  }
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

router.get('/me', (req, res, next) => {
  const user = req.user;
  res.json({ user });
});

module.exports = router;

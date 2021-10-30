'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Subscription = require('./../models/subscription');

router.get('/', routeGuard, (req, res, next) => {
  Subscription.findOne({ user: req.user._id, active: true })
    .then((subscription) => {
      res.json({ subscription });
    })
    .catch((error) => {
      next(error);
    });
});

// const SUBSCRIPTION_DURATION = 1000 * 60 * 60 * 24 * (365.25 / 12);
const SUBSCRIPTION_DURATION = 1000 * 60;

router.post('/', (req, res, next) => {
  Subscription.create({
    user: req.user._id,
    startDate: new Date(),
    nextBillingDate: new Date(Date.now() + SUBSCRIPTION_DURATION),
    active: true
  })
    .then((subscription) => {
      res.json({ subscription });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/', (req, res, next) => {
  Subscription.findOneAndUpdate({
    active: false
  })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

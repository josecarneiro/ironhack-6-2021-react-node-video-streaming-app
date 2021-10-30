'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Subscription = require('./../models/subscription');
const stripeApi = require('./../utils/stripe-api');

router.get('/', routeGuard, (req, res, next) => {
  Subscription.findOne({ user: req.user._id, active: true })
    .then((subscription) => {
      res.json({ subscription });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', (req, res, next) => {
  const { paymentMethodToken } = req.body;
  stripeApi.customers
    .create({
      name: req.user.name,
      email: req.user.email,
      payment_method: paymentMethodToken
    })
    .then((customer) => {
      return Subscription.create({
        user: req.user._id,
        startDate: new Date(),
        nextBillingDate: new Date(),
        active: true,
        customerId: customer.id,
        paymentMethodToken
      });
    })
    .then((subscription) => {
      res.json({ subscription });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/', routeGuard, (req, res, next) => {
  Subscription.findOneAndUpdate(
    { user: req.user._id, active: true },
    { active: false }
  )
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

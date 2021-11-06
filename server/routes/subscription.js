'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Subscription = require('./../models/subscription');
const stripeApi = require('./../utils/stripe-api');

router.get('/', routeGuard, async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      active: true
    });
    res.json({ subscription });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { paymentMethodToken } = req.body;
  try {
    const customer = await stripeApi.customers.create({
      name: req.user.name,
      email: req.user.email,
      payment_method: paymentMethodToken
    });
    const subscription = await Subscription.create({
      user: req.user._id,
      startDate: new Date(),
      nextBillingDate: new Date(),
      active: true,
      customerId: customer.id,
      paymentMethodToken
    });
    res.json({ subscription });
  } catch (error) {
    next(error);
  }
});

router.patch('/', routeGuard, async (req, res, next) => {
  try {
    await Subscription.findOneAndUpdate(
      { user: req.user._id, active: true },
      { active: false }
    );
    res.json({});
  } catch (error) {
    next(error);
  }
});

module.exports = router;

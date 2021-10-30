'use strict';

const User = require('./../models/user');
const Subscription = require('./../models/subscription');

module.exports = (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    User.findById(userId)
      .then((user) => {
        req.user = user.toObject();
        return Subscription.findOne({ user: userId, active: true });
      })
      .then((subscription) => {
        req.user.subscription = subscription;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next();
  }
};

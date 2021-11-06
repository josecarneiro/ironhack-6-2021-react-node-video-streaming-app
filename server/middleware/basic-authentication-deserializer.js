'use strict';

const User = require('./../models/user');
const Subscription = require('./../models/subscription');

module.exports = async (req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    try {
      const user = await User.findById(userId);
      req.user = user.toObject();
      const subscription = await Subscription.findOne({
        user: userId,
        active: true
      });
      req.user.subscription = subscription;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};

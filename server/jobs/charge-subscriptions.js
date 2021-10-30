const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Subscription = require('../models/subscription');
const stripeApi = require('./../utils/stripe-api');

const MONGODB_URI = process.env.MONGODB_URI;

const SUBSCRIPTION_DURATION = 1000 * 60 * 60 * 24 * (365.25 / 12);
const SUBSCRIPTION_PRICE_AMOUNT = 799;

const chargeSubscriptions = async () => {
  const subscriptions = await Subscription.find({
    nextBillingDate: { $lte: new Date() }
  });
  for (const subscription of subscriptions) {
    try {
      await stripeApi.paymentIntents.create({
        amount: SUBSCRIPTION_PRICE_AMOUNT,
        currency: 'eur',
        customer: subscription.customerId,
        payment_method: subscription.paymentMethodToken,
        confirm: true,
        error_on_requires_action: true
      });
      await Subscription.findByIdAndUpdate(subscription._id, {
        active: true,
        nextBillingDate: new Date(Date.now() + SUBSCRIPTION_DURATION)
      });
    } catch (error) {
      console.log('There was an error processing payment.');
      console.log(error);
      await Subscription.findByIdAndUpdate(subscription._id, { active: false });
    }
  }
};

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    return chargeSubscriptions();
  })
  .catch((error) => {
    console.error(`Error connecting the database to URI "${MONGODB_URI}"`);
    process.exit(1);
  })
  .finally(() => {
    mongoose.disconnect();
  });

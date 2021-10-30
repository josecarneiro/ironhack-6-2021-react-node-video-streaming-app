'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  nextBillingDate: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  customerId: {
    type: String,
    required: true
  },
  paymentMethodToken: {
    type: String,
    required: true
  }
});

const Subscription = mongoose.model('Subscription', schema);

module.exports = Subscription;

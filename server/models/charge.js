'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  successful: {
    type: Boolean,
    required: true
  }
});

const Charge = mongoose.model('Charge', schema);

module.exports = Charge;

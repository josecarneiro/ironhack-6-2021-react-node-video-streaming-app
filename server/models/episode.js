'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 140
  },
  url: {
    type: String,
    trim: true,
    required: true
  }
});

const Episode = mongoose.model('Episode', schema);

module.exports = Episode;

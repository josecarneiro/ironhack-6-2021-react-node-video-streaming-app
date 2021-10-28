'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 140
  },
  description: {
    type: String,
    trim: true,
    maxlength: 5000
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  episodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Episode'
    }
  ]
});

const Course = mongoose.model('Course', schema);

module.exports = Course;

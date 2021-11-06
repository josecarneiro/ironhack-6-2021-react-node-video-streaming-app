'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const Course = require('./../models/course');
const Episode = require('./../models/episode');

router.get('/course/list', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    next(error);
  }
  // Course.find()
  //   .then((courses) => {
  //     res.json({ courses });
  //   })
  //   .catch((error) => {
  //     next(error);
  //   });
});

router.get('/course/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id).populate('episodes');
    res.json({ course });
  } catch (error) {
    next(error);
  }
  // Course.findById(id)
  //   .populate('episodes')
  //   .then((course) => {
  //     res.json({ course });
  //   })
  //   .catch((error) => {
  //     next(error);
  //   });
});

router.get('/episode/:id', routeGuard, async (req, res, next) => {
  const { id } = req.params;
  try {
    const episode = await Episode.findById(id);
    res.json({ episode });
  } catch (error) {
    next(error);
  }
  // Episode.findById(id)
  //   .then((episode) => {
  //     res.json({ episode });
  //   })
  //   .catch((error) => {
  //     next(error);
  //   });
});

module.exports = router;

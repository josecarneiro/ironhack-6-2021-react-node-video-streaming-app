'use strict';

const express = require('express');
const routeGuard = require('../middleware/route-guard');
const Course = require('./../models/course');
const Episode = require('./../models/episode');

const router = express.Router();

router.get('/course/list', routeGuard, async (req, res, next) => {
  try {
    const courses = await Course.find({ creator: req.user._id });
    res.json({ list: courses });
  } catch (error) {
    next(error);
  }
});

router.post('/course', routeGuard, async (req, res, next) => {
  try {
    const episodes = await Episode.create(
      req.body.episodes.map(({ title, url }) => ({ title, url }))
    );
    const { title, description } = req.body;
    const course = await Course.create({
      creator: req.user._id,
      title,
      description,
      episodes: episodes.map(({ _id }) => _id)
    });
    res.json({ course });
  } catch (error) {
    next(error);
  }
});

router.patch('/course/:id', routeGuard, async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { title, description, episodes: [] },
      { new: true }
    );
    res.json({ course });
  } catch (error) {
    next(error);
  }
});

router.delete('/course/:id', routeGuard, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Course.findByIdAndRemove(id);
    res.json({});
  } catch (error) {
    next(error);
  }
});

module.exports = router;

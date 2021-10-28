'use strict';

const express = require('express');
const routeGuard = require('../middleware/route-guard');
const Course = require('./../models/course');
const Episode = require('./../models/episode');

const router = express.Router();

router.get('/course/list', routeGuard, (req, res, next) => {
  Course.find({ creator: req.user._id })
    .then((courses) => {
      res.json({ list: courses });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/course', routeGuard, (req, res, next) => {
  Episode.create(req.body.episodes.map(({ title, url }) => ({ title, url })))
    .then((episodes) => {
      const { title, description } = req.body;
      return Course.create({
        creator: req.user._id,
        title,
        description,
        episodes: episodes.map(({ _id }) => _id)
      });
    })
    .then((course) => {
      res.json({ course: course });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/course/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  Course.findByIdAndUpdate(
    id,
    { title, description, episodes: [] },
    { new: true }
  )
    .then((course) => {
      res.json({ course: course });
    })
    .catch((error) => {
      next(error);
    });
});

router.delete('/course/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Course.findByIdAndRemove(id)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

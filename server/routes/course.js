'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const Course = require('./../models/course');
const Episode = require('./../models/episode');

router.get('/course/list', (req, res, next) => {
  Course.find()
    .then((courses) => {
      res.json({ courses });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/course/:id', (req, res, next) => {
  const { id } = req.params;
  Course.findById(id)
    .populate('episodes')
    .then((course) => {
      res.json({ course });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/episode/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Episode.findById(id)
    .then((episode) => {
      res.json({ episode });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

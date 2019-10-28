var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const Video = require('../models/Video')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

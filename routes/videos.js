const videoController = require('../controllers/VideoController');
const express = require('express');
const router = express.Router();

/* GET users listing. */

router.post('/upload', videoController.uploadVideo);


module.exports = router;
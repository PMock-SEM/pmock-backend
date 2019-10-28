const videoController = require('../controllers/VideoController');
const express = require('express');
const router = express.Router();

router.post('/', videoController.addVideo);

router.get('/:id', videoController.getVideoById);

router.get('/', videoController.getVideos);

router.delete('/:id', videoController.deleteVideoById);

router.patch('/:id', videoController.updateVideoById);

module.exports = router;
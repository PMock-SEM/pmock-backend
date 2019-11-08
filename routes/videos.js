const videoController = require('../controllers/VideoController');
const express = require('express');
const router = express.Router();
const multer = require('multer');

router.post('/', videoController.addVideo);

router.post('/upload', videoController.uploadVideoToGCP);

router.get('/:id', videoController.getVideoById);

router.get('/', videoController.getVideos);

router.get('/:id/feedbacks', videoController.getFeedbacksbyVideoId);

router.delete('/:id', videoController.deleteVideoById);

router.patch('/:id', videoController.updateVideoById);

module.exports = router;
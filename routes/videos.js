const videoController = require('../controllers/VideoController');
const express = require('express');
const router = express.Router();
const Multer = require('multer');

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});


router.post('/', videoController.addVideo);

router.post('/upload', multer.single('file'), videoController.uploadVideoToGCP);

router.get('/:id', videoController.getVideoById);

router.get('/', videoController.getVideos);

router.get('/:id/feedbacks', videoController.getFeedbacksbyVideoId);

router.delete('/:id', videoController.deleteVideoById);

router.patch('/:id', videoController.updateVideoById);

module.exports = router;
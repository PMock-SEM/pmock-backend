const FeedbackController = require('../controllers/FeedbackController');
const express = require('express');
const router = express.Router();

/* GET feedback listing. */
router.get('/', FeedbackController.giveFeedback());

router.get('/:id', FeedbackController.getFeedbackById());

router.post('/', FeedbackController.giveFeedback);

module.exports = router;
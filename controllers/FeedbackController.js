const mongoose = require('mongoose');
const FeedbackService = require('../services/FeedbackService');
const Feedback = require('../models/Feedback');


class FeedbackController {
    static async giveFeedback(req, res, next) {
        try {
            const feedbackParams = {
                content: req.body.content,
            }
            let newFeedback = await FeedbackService.addFeedback(feedbackParams);
            return res.status(200).json({
                data: newFeedback,
                message: 'Success creating feedback'
            });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = FeedbackController;

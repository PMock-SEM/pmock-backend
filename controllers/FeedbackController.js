const mongoose = require('mongoose');
const FeedbackService = require('../services/FeedbackService');
const Feedback = require('../models/Feedback');


class FeedbackController {
  static async giveFeedback(req, res, next) {
    try {
      const feedbackParams = {
        coachId: req.body.coachId,
        videoId: req.body.videoId,
        content: req.body.content,
      };
      let newFeedback = await FeedbackService.addFeedback(feedbackParams);
      return res.status(200).json({
        data: newFeedback,
        message: 'Success creating feedback'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getFeedback(req, res, next) {
    try {
      let feedbacks = await FeedbackService.getFeedback();
      return res.status(200).json({
        data: feedbacks,
        message: 'Success getting feedback'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getFeedbackById(req, res) {
    const id = req.params.id;
    try {
      let feedback = await FeedbackService.getFeedbackById(id);
      return res.status(200).json({
        data: feedback,
        message: 'Success getting feedback by id'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getFeedbackByVideoId(req, res) {
    const id = req.params.id;
    try {
      let feedback = await FeedbackService.getFeedbackByVideoId(id);
      return res.status(200).json({
        data: feedback,
        message: 'Success getting feedback by VideoId'
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = FeedbackController;
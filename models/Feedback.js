const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema, 'feedbacks');
module.exports = Feedback;
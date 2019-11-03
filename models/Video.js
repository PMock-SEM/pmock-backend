const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  videoName: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
});

VideoSchema.virtual('feedbacks', {
  ref: 'Feedback',
  localField: '_id',
  foreignField: 'videoId',
  justOne: false
});

const Video = mongoose.model('Video', VideoSchema, 'videos');
module.exports = Video;
const mongoose = require('mongoose');
const BCrypt = require('bcryptjs');
const SALT_FACTOR = 10;

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


const Video = mongoose.model('Video', VideoSchema, 'videos');
module.exports = Video;
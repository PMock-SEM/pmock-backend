const mongoose = require('mongoose');
const Video = mongoose.model('Video');
const config = require('../config');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');

class VideoService {
  static async getVideoById(videoId) {
    try {
      let video = await Video.findOne({ _id: videoId });
      return video;
    } catch (exception) {
      throw Error('Error while getting video by id');
    }
  }

  static async addVideo(videoParams) {
    try {
      const video = await new Video(videoParams).save();
      return video;
    } catch (exception) {
      throw Error('Error while adding video');
    }
  }

  static async getVideos() {
    try {
      let videos = await Video.find({});
      return videos;
    } catch (exception) {
      throw Error('Error while getting videos');
    }
  }

  static async updateVideoById(videoId, videoParams) {
    try {
      const video = await Video.findByIdAndUpdate(mongoose.Types.ObjectId(videoId), videoParams, { new: true });
      return video;
    } catch (exception) {
      throw Error('Error while updating video');
    }
  }

  static async getFeedbacksByVideoId(id) {
    try {
      let feedbacks = await Video.findById(id).populate('feedbacks').exec().then(video => {
        return video.feedbacks;
      });
      return feedbacks;
    } catch (exception) {
      console.log(exception);
      throw Error('Error while getting feedbacks by video id');
    }
  }

  static async removeVideoById(id) {
    try {
      await Video.remove({ _id: mongoose.Types.ObjectId(id) });
    } catch (exception) {
      throw Error('Error while removing user by id');
    }
  }

  static async uploadVideoOnCloud(videoName, file, userId) {
    const storage = new Storage();
    const bucket = storage.bucket("pmock");


    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on('error', err => {
      next(err);
    });
    blobStream.on('finish', () => {
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      return publicUrl;
    });
    blobStream.end(file.buffer);
  }
}

module.exports = VideoService;
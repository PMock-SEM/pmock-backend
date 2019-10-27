const VideoService = require('../services/VideoService');
const multer = require('multer');

class VideoController {
  static async addVideo(req, res) {
    try {
      const videoUrl = req.body.videoUrl;
      const userId = req.body.userId;
      const videoName = req.body.videoName;

      if (!videoUrl) {
        return res.status(400).json({ message: 'no file uploaded' })
      }
      const videoParams = {
        userId: userId,
        videoUrl: videoUrl,
        videoName: videoName
      };
      let newVideo = await VideoService.addVideo(videoParams);
      return res.status(200).json({
        data: newVideo,
        message: 'Success creating new video data'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getVideos(req, res) {
    try {
      let videos = await VideoService.getVideos();
      return res.status(200).json({
        data: videos,
        message: 'Success getting videos'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getVideoById(req, res) {
    try {
      const id = req.params.id;
      let video = await VideoService.getVideoById(id);
      return res.status(200).json({
        data: video,
        message: 'Success getting video by id'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateVideoById(req, res) {
    try {
      const videoId = req.params.id;
      const videoUrl = req.body.videoUrl;
      const videoName = req.body.videoName;

      const videoParams = {
        videoUrl: videoUrl,
        videoName: videoName
      };

      const video = await VideoService.updateVideoById(videoId, videoParams);
      return res.status(200).json({
        data: video,
        message: 'Success updating video by id'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteVideoById(req, res) {
    const id = req.params.id;
    try {
      await VideoService.removeVideoById(id);
      return res.status(200).json({
        message: 'Success deleting video by id'
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = VideoController;

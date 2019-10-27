const mongoose = require('mongoose');
const {format} = require('util');

const VideoService = require('../services/VideoService');
const Video = require('../models/Video');
const videoDb = mongoose.model('Video');



class VideoController {
    static async uploadVideo(req, res) {
        try {
            const videoUri = req.body.videoURI;
            if (!videoUri) {
                return res.status(400).json({message: 'no file uploaded'})
            }
            let publicUrl = VideoService.uploadVideoOnCloud(videoUri);
            let videoParams = {
                userId: req.body.userId,
                status: "new",
                videoLink: publicUrl,
                uploadDate:new Date()
            };
            let newVideo = await VideoService.addVideoToDb(videoParams);
            return res.status(200).json({
                data: newVideo,
                message: 'Success creating new video data'
            });
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = VideoController;

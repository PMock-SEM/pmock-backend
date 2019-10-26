const mongoose = require('mongoose');
const UserService = require('../services/UserService');
const Video = require('../models/Video');
const videoDb = mongoose.model('Video');

class VideoController {

    static async getVideosById(req, res) {
        let userId = req.body.id;
        try {
            let videoData = await videoDb.find({"userId":userId});
            return res.status(200).json({
                data: videoData,
                message: 'Success getting users by id'
            });
        } catch (e) {
            console.log(e);
        }
    }

    static async uploadVideo(req, res) {
        try {
            const videoUri = req.body.videoURI;
            const userId = req.body.userId;

            
            return res.status(200).json({
                data: user,
                message: 'Success updating user by id'
            });
        } catch (e) {
            console.log(e);
        }
    }

}

module.exports = VideoController;

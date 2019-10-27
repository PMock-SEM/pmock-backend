const mongoose = require('mongoose');
const Video = mongoose.model('Video');
const config = require('../config');
const Multer = require('multer');
const bodyParser = require('body-parser');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');

class VideoService {
    static async addVideoToDb(videoParams) {
        try {
            const video = await new Video(videoParams).save();
            return video;
        } catch (exception) {
            throw Error('Error while adding user');
        }
    }

    static async uploadVideoOnCloud(videoURI){
        const storage = new Storage();
         // Multer is required to process file uploads and make them available via req.files.
        const multerFunc = Multer({
            storage: Multer.memoryStorage(),
            limits: {
                fileSize: 100 * 1024 * 1024, // no larger than 100MB, you can change as needed.
            }
        });
        const bucket = storage.bucket("pmock");
        multerFunc.single(videoURI);
        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(videoURI);
        const blobStream = blob.createWriteStream();
        blobStream.on('error', err => {
            next(err);
        });
        blobStream.on('finish', () => {
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            console.log("***** got the public url******")
            console.log(publicUrl);
            return publicUrl
        });
        blobStream.end(videoURI.buffer);
    }
}

module.exports = VideoService;
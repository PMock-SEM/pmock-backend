const mongoose = require('mongoose');
const BCrypt = require('bcryptjs');
const SALT_FACTOR = 10;

const VideoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type:String,
        required: true
    },
    videoLink:{
        type:String,
        required: true
    },
    timestamps: {
        uploadDate: 'createdTime',
        updatedAt: 'updatedTime'
    }
});


const User = mongoose.model('Video', VideoSchema, 'videos');
module.exports = Video;
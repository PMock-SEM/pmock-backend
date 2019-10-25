const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
        feedbackId: {
            type: String,
            required: true,
            unique: true
        },
        coachId: {
            type: Schema.Types.ObjectId,
            ref: 'Coach',
            required: true
        },
        videoId: {
            type: Schema.Types.ObjectId,
            ref: 'Video',
            required: true
        },
        content: String
        }, {
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime'
        }
        });

FeedbackSchema.pre('save', function (next) {
    let feedback = this;
});

FeedbackSchema.methods = {
}

const Feedback = mongoose.model('Feedback', FeedbackSchema, 'feedbacks');
module.exports = Feedback;
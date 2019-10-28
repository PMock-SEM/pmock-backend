const mongoose = require('mongoose');
const Feedback = mongoose.model('Feedback');

class FeedbackService {
    static async addFeedback(feedbackParams) {
        try {
            const feedback = await new Feedback(feedbackParams).save();
            return feedback;
        } catch (exception) {
            throw Error('Error while adding feedback');
        }
    }

    static async getFeedback() {
        try {
            let feedback = await Feedback.find({});
            return feedback;
        } catch (exception) {
            throw Error('Error while getting feedback notes');
        }
    }

    static async getFeedbackById(id) {
        try {
            let feedback = await Feedback.findOne({ _id: id });
            return feedback;
        } catch (exception) {
            throw Error('Error while getting feedback by id');
        }
    }


    static async getFeedbackByVideoId(videoId) {
        try {
            let feedback = await Feedback.find({ videoId: videoId });
            return feedback;
        } catch (exception) {
            throw Error('Error while getting feedback by videoId');
        }
    }
}

module.exports = FeedbackService;
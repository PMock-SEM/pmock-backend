const mongoose = require('mongoose');
const Coach = mongoose.model('Coach');
const jwt = require('jsonwebtoken');
const config = require('../config');

class CoachService {
  static async authenticateCoach(coachParams) {
    try {
      const coach = await Coach.findOne({ coachEmail: coachParams.coachEmail });
      if (coach.comparePasswordSync(coachParams.password)) {
        const token = await jwt.sign({ _id: coach._id }, config.SECRET_KEY, { expiresIn: '5h' });
        return token;
      }
      return "";
    } catch (exception) {
      throw Error('Error while signing in coach');
    }
  }

  static async addCoach(coachParams) {
    try {
      const coach = await new Coach(coachParams).save();
      return coach;
    } catch (exception) {
      throw Error('Error while adding coach');
    }
  }

  static async updateCoachById(coachId, coachParams) {
    try {
      const coach = await Coach.findByIdAndUpdate(mongoose.Types.ObjectId(coachId), coachParams, { new: true });
      return coach;
    } catch (exception) {
      throw Error('Error while updating coach');
    }
  }

  static async getCoaches() {
    try {
      let coaches = await Coach.find({});
      return coaches;
    } catch (exception) {
      throw Error('Error while getting coaches');
    }
  }

  static async getCoachById(id) {
    try {
      let coach = await Coach.findOne({ _id: id });
      return coach;
    } catch (exception) {
      throw Error('Error while getting coach by id');
    }
  }

  static async removeCoachById(id) {
    try {
      await Coach.remove({ _id: mongoose.Types.ObjectId(id) });
    } catch (exception) {
      throw Error('Error while removing coach by id');
    }
  }

  static async getFeedbacksByCoachId(id) {
    try {
      let feedbacks = await Coach.findById(id).populate('feedbacks').exec().then(coach => {
        return coach.feedbacks;
      });
      return feedbacks;
    } catch (exception) {
      throw Error('Error while getting feedbacks by coach id');
    }
  }
}

module.exports = CoachService;
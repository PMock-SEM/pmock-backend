const mongoose = require('mongoose');
const CoachService = require('../services/CoachService');
const Coach = require('../models/Coach');

class CoachController {
  static async signIn(req, res, next) {
    try {
      const coachParams = {
        coachEmail: req.body.email,
        password: req.body.password
      };

      const token = await CoachService.authenticateCoach(coachParams);
      if (!token) {
        return res.status(401).json({
          message: 'Email and password does not match'
        });
      }
      return res.status(200).json({
        token: token,
        message: 'Success signing in user'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async signUp(req, res, next) {
    try {
      const coachParams = {
        coachFirstName: req.body.firstName,
        coachLastName: req.body.lastName,
        coachEmail: req.body.email,
        password: req.body.password,
        avatarLink: req.body.avatarLink
      };
      let newCoach = await CoachService.addCoach(coachParams);
      return res.status(200).json({
        data: newCoach,
        message: 'Success creating coach'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getCoaches(req, res, next) {
    try {
      let coaches = await CoachService.getCoaches();
      return res.status(200).json({
        data: coaches,
        message: 'Success getting coaches'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getCoachById(req, res) {
    const id = req.params.id;
    try {
      let coach = await CoachService.getCoachById(id);
      return res.status(200).json({
        data: coach,
        message: 'Success getting coach by id'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateCoachById(req, res) {
    try {
      const coachId = req.params.id;
      const coachParams = {
        coachFirstName: req.body.firstName,
        coachLastName: req.body.lastName,
        coachEmail: req.body.email,
        password: req.body.password,
        avatarLink: req.body.avatarLink,
        rating: req.body.rating
      };
      const coach = await CoachService.updateCoachById(coachId, coachParams);
      return res.status(200).json({
        data: coach,
        message: 'Success updating coach by id'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteCoachById(req, res) {
    const id = req.params.id;
    try {
      await CoachService.removeCoachById(id);
      return res.status(200).json({
        message: 'Success deleting coach by id'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getFeedbacksByCoachId(req, res) {
    const id = req.params.id;
    try {
      const feedbacks = await CoachService.getFeedbacksByCoachId(id);
      return res.status(200).json({
        data: feedbacks,
        message: 'Success getting feedbacks by coach id'
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CoachController;

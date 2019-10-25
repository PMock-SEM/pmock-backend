const mongoose = require('mongoose');
const UserService = require('../services/UserService');
const User = require('../models/User');

class UserController {
  static async signUp(req, res, next) {
    try {
      const userParams = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        avatarLink: req.body.avatarLink
      }
      let newUser = await UserService.addUser(userParams);
      return res.status(200).json({
        data: newUser,
        message: 'Success creating user'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getUsers(req, res, next) {
    try {
      let users = await UserService.getUsers();
      return res.status(200).json({
        data: users,
        message: 'Success getting users'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getUserById(req, res) {
    const id = req.params.id;
    try {
      let user = await UserService.getUserById(id);
      return res.status(200).json({
        data: user,
        message: 'Success getting users by id'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateUserById(req, res) {
    try {
      const userId = req.params.id;
      const userParams = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        avatarLink: req.body.avatarLink
      };
      const user = await UserService.updateUserById(userId, userParams);
      return res.status(200).json({
        data: user,
        message: 'Success updating user by id'
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteUserById(req, res) {
    const id = req.params.id;
    try {
      await UserService.removeUserById(id);
      return res.status(200).json({
        message: 'Success deleting user by id'
      });
    } catch (e) {
      console.log(e);
    }
  }


}

module.exports = UserController;
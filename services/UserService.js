const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('../config');

class UserService {
  static async authenticateUser(userParams) {
    try {
      const user = await User.findOne({ email: userParams.email });
      if (user.comparePasswordSync(userParams.password)) {
        const token = await jwt.sign({ _id: user._id }, config.SECRET_KEY, { expiresIn: '5h' });
        return token;
      }
      return "";
    } catch (exception) {
      throw Error('Error while signing in user');
    }
  }

  static async addUser(userParams) {
    try {
      const user = await new User(userParams).save();
      return user;
    } catch (exception) {
      throw Error('Error while adding user');
    }
  }

  static async updateUserById(userId, userParams) {
    try {
      const user = await User.findByIdAndUpdate(mongoose.Types.ObjectId(userId), userParams, { new: true });
      return user;
    } catch (exception) {
      throw Error('Error while updating user');
    }
  }

  static async getUsers() {
    try {
      let users = await User.find({});
      return users;
    } catch (exception) {
      throw Error('Error while getting users');
    }
  }

  static async getUserById(id) {
    try {
      let user = await User.findOne({ _id: id });
      return user;
    } catch (exception) {
      throw Error('Error while getting user by id');
    }
  }

  static async removeUserById(id) {
    try {
      await User.remove({ _id: mongoose.Types.ObjectId(id) });
    } catch (exception) {
      throw Error('Error while removing user by id');
    }
  }

  static async getVideosByUserId(id) {
    try {
      const query = await User.findById(id).populate('videos');
      query.exec((err, user) => {
        return {
          user,
          videos: user.videos
        }
      });
    } catch (exception) {
      throw Error('Error while getting videos by user id');
    }
  }
}

module.exports = UserService;
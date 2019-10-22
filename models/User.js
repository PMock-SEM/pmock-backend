const mongoose = require('mongoose');
const BCrypt = require('bcryptjs');
const SALT_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  avatarLink: String,
  linkedAcessToken: String
}, {
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
});

UserSchema.virtual('fullName').get(() => {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.pre('save', function (next) {
  let user = this;
  let salt = BCrypt.genSaltSync(SALT_FACTOR);

  if (!user.isModified('password')) {
    return next();
  }

  BCrypt.hash(user.password, salt, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods = {
  comparePassword: function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  },
  comparePasswordSync: function (password) {
    return BCrypt.compareSync(password, this.password);
  }
}

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
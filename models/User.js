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
  password: {
    type: String,
    requied: true
  },
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

UserSchema.virtual('videos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'userId',
  justOne: false
})

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

UserSchema.pre("findOneAndUpdate", function (next) {
  const password = this.getUpdate().password;
  if (!password) {
    return next();
  }
  try {
    const salt = BCrypt.genSaltSync(SALT_FACTOR);
    const hash = BCrypt.hashSync(password, salt);
    this.getUpdate().password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods = {
  comparePassword: function (password, cb) {
    BCrypt.compare(password, this.password, function (err, isMatch) {
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
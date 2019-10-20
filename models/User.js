import mongoose, { Schema } from 'mongoose';
const BCrypt = require('bcryptjs');
const SALT_FACTOR = 10;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  avatarLink: String,
  linkedAcessToken: String
}, {
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
});

UserSchema.pre('save', function (next) {
  let user = this;
  let salt = BCrypt.genSaltSync(SALT_FACTOR);

  if (this.isNew) {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  } else {
    this.updatedAt = Date.now();
  }

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

export default mongoose.model('User', UserSchema);
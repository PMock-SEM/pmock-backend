const mongoose = require('mongoose');
const BCrypt = require('bcryptjs');
const SALT_FACTOR = 10;

const CoachSchema = new mongoose.Schema({
  coachEmail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        let pattern = /^\S+@\S+$/
        return pattern.test(val)
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: String,
  coachFirstName: String,
  coachLastName: String,
  avatarLink: String,
  linkedAccessToken: String,
  rating: Number,
}, {
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
});

CoachSchema.virtual('fullName').get(() => {
  return this.coachFirstName + ' ' + this.coachLastName;
});

CoachSchema.virtual('feedbacks', {
  ref: 'Feedback',
  localField: '_id',
  foreignField: 'coachId',
  justOne: false
});

CoachSchema.pre('save', function (next) {
  let coach = this;
  let salt = BCrypt.genSaltSync(SALT_FACTOR);

  if (!coach.isModified('password')) {
    return next();
  }

  BCrypt.hash(coach.password, salt, (err, hash) => {
    if (err) return next(err);
    coach.password = hash;
    next();
  });
});

CoachSchema.pre("findOneAndUpdate", function (next) {
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

CoachSchema.methods = {
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

const Coach = mongoose.model('Coach', CoachSchema, 'coaches');
module.exports = Coach;
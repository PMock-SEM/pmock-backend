import mongoose, { Schema } from 'mongoose';

let coachSchema = new Schema({
  coachId: {
    type: String,
    required: true,
    unique: true
  },
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
    }, 
});

const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('../config');
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => {
		done(null, user);
	});
	
});

passport.use(new LinkedInStrategy({
  clientID: keys.linkedInClientID,
  clientSecret: keys.linkedInClientSecret,
  callbackURL: "/users/auth/linkedin/callback",
  scope: ['r_emailaddress','r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {

	User.findOne({ linkedinId : profile.id })
	.then( (existingUser)=> {
		if (existingUser) {
			// user exists already
			done(null, existingUser);
		} else {
			// new user
			new User({linkedinId : profile.id})
			.save()
			.then( user => done(null,user));
		}
	})

}));
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('../config');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Coach = mongoose.model('Coach');
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => {
		done(null, user);
	});
	
});

passport.use('userLogin',new LinkedInStrategy({
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
			new User({linkedinId : profile.id, firstName:profile.name.givenName ,
  lastName: profile.name.familyName,
  email: profile.emails[0].value,
  avatarLink: profile.photos[0].value})
			.save()
			.then( user => done(null,user));
		}
	})

}));

passport.use('coachLogin',new LinkedInStrategy({
  clientID: keys.linkedInClientID,
  clientSecret: keys.linkedInClientSecret,
  callbackURL: "/coaches/auth/linkedin/callback",
  scope: ['r_emailaddress','r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
	Coach.findOne({ linkedinId : profile.id })
	.then( (existingCoach)=> {
		if (existingCoach) {
			// Coach exists already
			done(null, existingCoach);
		} else {
			// new Coach
			new Coach({linkedinId : profile.id, coachFirstName:profile.name.givenName ,
  coachLastName: profile.name.familyName,
  coachEmail: profile.emails[0].value,
  avatarLink: profile.photos[0].value})
			.save()
			.then( coach => done(null,coach));
		}
	})

}));
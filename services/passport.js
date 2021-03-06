const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// user is whatever you pull out of the database from the strategy's query
passport.serializeUser((user, done) => {
  // user.id != profile.id. user.id is mongo. profile.id is google. user.id becomes the token
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

//creates a new instance of a Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        done(null, existingUser);
      }

      // creates a new instance of a user and saves it to the database
      const user = await new User({ googleId: profile.id }).save()
      done(null, user);
    } 
  )
);
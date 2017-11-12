const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

//creates a new instance of a Google Strategy
passport.use(new GoogleStrategy());

//allows heroku to dynamically set the port using the PORT env variable
const PORT = process.env.PORT || 5000
app.listen(PORT);
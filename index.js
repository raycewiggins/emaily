const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI)

const app = express();

// where all the middle wheres are written in
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// tells passport to use cookie authentication
app.use(passport.initialize());
app.use(passport.session());

// when require is called it returns a function and immediately invokes the function
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//allows heroku to dynamically set the port using the PORT env variable
const PORT = process.env.PORT || 5000
app.listen(PORT);
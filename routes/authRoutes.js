const passport = require('passport');

module.exports = (app) => {
  // google is an internal identifier for the GoogleStrategy
  // scope contains the permissions
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
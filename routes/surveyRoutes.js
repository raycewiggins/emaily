const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
  
    // makes an instance of a survey in memory (has not been saved yet)
    const survey = new Survey({
      title,
      subject,
      body,
      // splits the recipients string and returns an array of abjects with property of email with the assigned email address.
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    
    try { 
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
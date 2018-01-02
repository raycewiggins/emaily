const mongoose = require('mongoose');
const{ Schema } = mongoose;
const RecipientScehma = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientScehma],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 }
});

mongoose.model('surveys', surveySchema);
const mongoose = require('mongoose');
const{ Schema } = mongoose;
const RecipientScehma = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientScehma],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // how to relate a property to another model (User)
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
// ES6 destructuring
const mongoose = require('mongoose');
const{ Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

// (name of collection, the schema)
mongoose.model('users', userSchema);
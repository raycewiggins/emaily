// ES6 destructuring
const mongoose = require('mongoose');
const{ Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// (name of collection, the schema)
mongoose.model('users', userSchema);
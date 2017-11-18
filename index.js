const express = require('express');
require('./services/passport');

const app = express();

// when require is called it returns a function and immediately invokes the function
require('./routes/authRoutes')(app);

//allows heroku to dynamically set the port using the PORT env variable
const PORT = process.env.PORT || 5000
app.listen(PORT);
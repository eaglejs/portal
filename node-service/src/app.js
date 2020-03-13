const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const routes = [
  require('./routes/login'),
  require('./routes/register'),
  require('./routes/toggle-garage-door'),
  require('./routes/user-info')
];
const port = 8080;
const originsWhitelist = [
  'http://localhost:4200', //this is my front-end url for development
  'http://app.portal.com'
];
const corsOptions = {
  origin: (origin, callback) => {
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  }
};
const APP = express();

let db = null;

// create mongodb connection
mongoose.connect('mongodb://mongo:27017/portal', {});

db = mongoose.connection;

//add cors whitelist
APP.use(cors(corsOptions));

// user sessions for tracking logins
APP.use(
  session({
    secret: "It's dangerous to go alone!",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

// make user ID available in templates
APP.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

// parse incoming requests
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));

// include routes
routes.forEach(route => {
  APP.use('/api', route);
});

// catch 404 and forward to error handler
APP.use((req, res, next) => {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last APP.use callback
APP.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// listen on port 3000
APP.listen(port, function() {
  console.log(`Express APP listening on port: ${port}`);
});

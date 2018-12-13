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
  'http://www.myproductionurl.com'
];
const corsOptions = {
  origin: function(origin, callback) {
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  }
};

const app = express();

// mongodb connection
mongoose.connect(
  'mongodb://mongo:27017/portal',
  {}
);

let db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

//add cors whitelist
app.use(cors(corsOptions));

// user sessions for tracking logins
app.use(
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
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// include routes
//app.use('/', routes);
[].forEach.call(routes, function(route) {
  app.use('/', route);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// listen on port 3000
app.listen(port, function() {
  console.log(`Express app listening on port: ${port}`);
});

var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/test', (req, res, next) => {
  res.status(200).json({
    success: true
  });
});

// POST /login
router.post('/login', function(req, res, next) {
  if (!!(req.body.username && req.body.password)) {
    User.authenticate(req.body.username, req.body.password, function(
      error,
      user
    ) {
      if (error || !user) {
        res.status(403).json({
          error: error
        });
      } else {
        req.session.userId = user._id;
        res.json({
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role
        });
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // devare session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({ loggedIn: false });
      }
    });
  }
});

// POST /isLoggedIn
router.post('/is-logged-in', function(req, res, next) {
  if (req.session && req.session.userId) {
    User.findById(req.session.userId).exec(function(error, user) {
      if (error) {
        res.json({
          message: 'You must be logged in to access the application.'
        });
      } else {
        res.json({
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role
        });
      }
    });
  } else {
    res.send({
      error: 'You must be logged in to access the application'
    });
  }
});

module.exports = router;

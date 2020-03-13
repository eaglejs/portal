const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/test', (req, res, next) => {
  res.status(200).json({
    success: true
  });
});

// POST /login
router.post('/login', (req, res, next) => {
  if (!!(req.body.username && req.body.password)) {
    User.authenticate(req.body.username, req.body.password, (error, user) => {
      if (error || !user) {
        return res.status(403).json({
          error: error
        });
      } else {
        req.session.userId = user._id;
        return res.json({
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role
        });
      }
    });
  } else {
    const err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    // devare session object
    req.session.destroy(err => {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({ loggedIn: false });
      }
    });
  }
});

// POST /isLoggedIn
router.post('/is-logged-in', (req, res, next) => {
  if (req.session && req.session.userId) {
    User.findById(req.session.userId).exec( (error, user) => {
      if (error) {
        return res.json({
          message: 'You must be logged in to access the application.'
        });
      } else {
        return res.json({
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role
        });
      }
    });
  } else {
    return res.send({
      error: 'You must be logged in to access the application'
    });
  }
});

module.exports = router;

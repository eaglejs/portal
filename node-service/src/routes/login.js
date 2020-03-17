const express = require('express');
const jwtHandler = require('../middleware/jwt-handler');
const router = express.Router();
const User = require('../models/user');

router.get('/ping', (req, res, next) => {
  res.status(200).json({
    success: true
  });
});

// POST /login
router.post('/login', function (req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        return res.status(401).json({
          error: error
        });
      } else {
        const payload = {
          email: user.email,
          name: user.name,
          role: user.role
        }

        return jwtHandler.createToken(req, res, next, payload);
      }
    });
  } else {
    const err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// POST /refresh-token
router.post('/refresh-token', (req, res, next) => {
  const token = req.body.jwt;
  let payload;
  if (!token) {
    return res.status(401).end();
  }

  try {
    payload = jwt.verify(token, jwtKey);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }

  const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end()
  }

  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })
  res.json({ jwt: newToken, expiration: jwtExpirySeconds * 1000 });

});

module.exports = router;

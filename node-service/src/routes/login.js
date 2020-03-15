const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

const jwtKey = 'It is dangerous to go alone!';
const jwtExpirySeconds = 300 // 5mins

router.get('/ping', (req, res, next) => {
  res.status(200).json({
    success: true
  });
});

// POST /login
router.post('/login', function (req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      const payload = {
        email: user.email,
        name: user.name,
        role: user.role
      }
      if (error || !user) {
        return res.status(403).json({
          error: error
        });
      } else {
        const token = jwt.sign({ user: user.email }, jwtKey, {
          algorithm: 'HS256',
          expiresIn: jwtExpirySeconds
        })
        return res.json({ user: payload, jwt: token, expiration: jwtExpirySeconds * 1000 });
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
  let payload = {
    exp: 0,

  };
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
  res.json({jwt: newToken, expiration: jwtExpirySeconds * 1000 });

});

module.exports = router;

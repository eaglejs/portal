const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

const jwtKey = 'It is dangerous to go alone!';
const jwtExpirySeconds = 300 // 5mins

// POST /register
router.post('/register', (req, res, next) => {

    User.find().exec((error, data) => {
        var userData = {
            email: '',
            name: '',
            username: '',
            password: '',
            role: ''
        };
        if (req.body.email &&
            req.body.name &&
            req.body.username &&
            req.body.password &&
            req.body.confirmPassword) {

            // confirm that user typed same password twice
            if (req.body.password !== req.body.confirmPassword) {
                var err = new Error('Passwords do not match.');
                err.status = 400;
                return next(err);
            }

            // create object with form input
            userData.email = req.body.email;
            userData.name = req.body.name;
            userData.username = req.body.username;
            userData.password = req.body.password;
            if (!data.length) {
                userData.role = 'admin';
            } else {
                userData.role = 'user';
            }

            // user schema's `create` method to insert document into Mongo
            User.create(userData, (error, user) => {
                if (error) {
                    return next(error);
                } else {
                    const token = jwt.sign({ user: user.email }, jwtKey, {
                        algorithm: 'HS256',
                        expiresIn: jwtExpirySeconds
                    } )
                    return res.json({ user, jwt: token, expiration: jwtExpirySeconds * 1000});
                }
            });

        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }

    });
});

// POST /is-registered
router.post('/is-registered', (req, res, next) => {
    // TO-DO: Check if there are users in the collection.
    User.find().exec(function (error, data) {
        data.length ? res.json({ isRegistered: true }) : res.json({ isRegistered: false });
    });

});

module.exports = router;

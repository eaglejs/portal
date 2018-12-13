var express = require('express');
var router = express.Router();
var User = require('../models/user');

// POST /register
router.post('/register', function (req, res, next) {

    User.find().exec(function (error, data) {
        if (!data.length) {
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
                var userData = {
                    email: req.body.email,
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    role: 'admin'
                };

                // user schema's `create` method to insert document into Mongo
                User.create(userData, function (error, user) {
                    if (error) {
                        return next(error);
                    } else {
                        req.session.userId = user._id;
                        return res.json(req.session);
                    }
                });

            } else {
                var err = new Error('All fields required.');
                err.status = 400;
                return next(err);
            }
        } else {
            if (req.session && req.session.userId) {
                User.findById(req.session.userId)
                    .exec(function (error, user) {
                        if (error || user.role !== 'admin') {
                            res.status(403).json({
                                message: 'Something went wrong or you are Unauthorized.'
                            });
                        } else {
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
                                var userData = {
                                    email: req.body.email,
                                    name: req.body.name,
                                    username: req.body.username,
                                    password: req.body.password,
                                    role: 'user'
                                };

                                // user schema's `create` method to insert document into Mongo
                                User.create(userData, function (error, user) {
                                    if (error) {
                                        return next(error);
                                    } else {
                                        return res.json({message: 'Success!'});
                                    }
                                });

                            } else {
                                var err = new Error('All fields required.');
                                err.status = 400;
                                return next(err);
                            }
                        }
                    });
            } else {
                res.status(403).send({
                    error: "You are Unauthorized"
                });
            }

        }
    });
});

// POST /is-registered
router.post('/is-registered', function (req, res, next) {
    // TO-DO: Check if there are users in the collection.

    User.find().exec(function (error, data) {
        data.length ? res.json({ isRegistered: true }) : res.json({ isRegistered: false });
    });

});

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/user');

// POST /get-user-information
router.post('/user-information', function (req, res, next) {
    if (req.session && req.session.userId) {
        User.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    res.json({
                        message: 'Error(101): You must be logged in to access the application.'
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
        res.status(403).json({
            message: 'Error(102): You must be logged in to access the application.'
        });
    }
});

module.exports = router;

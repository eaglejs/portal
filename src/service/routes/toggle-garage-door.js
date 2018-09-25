var express = require('express');
var router = express.Router();
var User = require('../models/user');
var GarageDoors = require('../models/garage.doors');
var RequiresLogin = require('../middleware/requires-login');
var request = require('request');


// POST /toggleGarageDoor
router.post('/rest/toggleGarageDoor', RequiresLogin, function (req, res, next) {
	let pythonUrl = 'http://api:5000/api/toggleGarageDoor';
	
	request.get(pythonUrl, function(pyErr, pyRes, pyBody) {
		if (!pyErr && pyRes.statusCode === 200) {
			res.status(200).send(pyRes.body);
		}
	});

});

module.exports = router;
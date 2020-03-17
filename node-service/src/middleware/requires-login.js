const jwtHandler = require('../middleware/jwt-handler');

function requiresLogin(req, res, next) {
	let token = '';
	if (req.headers.authorization) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return res.status(401).end()
	}

	return jwtHandler.verifyToken(req, res, next, token);

}

module.exports = requiresLogin;
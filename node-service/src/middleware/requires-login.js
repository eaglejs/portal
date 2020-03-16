const jwtHandler = require('../middleware/jwt-handler');

function requiresLogin(req, res, next) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).end()
	}

	return jwtHandler.verifyToken(req, res, next, token);

}

module.exports = requiresLogin;
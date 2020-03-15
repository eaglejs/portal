const jwt = require('jsonwebtoken');
const jwtKey = 'It is dangerous to go alone!';

function requiresLogin(req, res, next) {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).end()
	}

	let payload;
	try {
		payload = jwt.verify(token.split(' ')[1], jwtKey)
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).end()
		}
		// otherwise, return a bad request error
		return res.status(400).end()
	}
	return next();
}

module.exports = requiresLogin;

function requiresLogin(req, res, next) {
	if (req.session && req.session.userId) {
		console.log('you are logged in');
		return next();
	} else {
		var err = new Error("You must be logged in to view this page.");
		console.log(err);
		return next(err);
	}
}

module.exports = requiresLogin;
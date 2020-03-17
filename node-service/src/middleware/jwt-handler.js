const jwt = require('jsonwebtoken');
const jwtKey = 'It is dangerous to go alone!';
const jwtExpirySeconds = 300 // 5mins

const createToken = (req, res, next, user) => {
  const payload = {
    email: user.email,
    name: user.name,
    role: user.role
  }
  const token = jwt.sign({ user: user.email }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })
  const decoded = jwt.verify(token, jwtKey);
  return res.json({ user: payload, jwt: token, expirationCountdown: jwtExpirySeconds * 1000, expiration: decoded.exp });
}

const verifyToken = (req, res, next, token) => {
  isVerified = false;
  try {
    isVerified = jwt.verify(token, jwtKey);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      res.status(401).end();
      return isVerified;
    }
    // otherwise, return a bad request error
    res.status(400).end()
    return isVerified;
  }
}

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;

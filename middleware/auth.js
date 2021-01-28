const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, config.get('jwtToken'));
    req.user = verified.user;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token String');
  }
};

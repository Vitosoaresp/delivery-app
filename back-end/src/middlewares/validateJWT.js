const jwt = require('../utils/jwt');

module.exports = async (req, _res, next) => {
  const token = req.header('Authorization');
  jwt.validateToken(token);
  next();
};

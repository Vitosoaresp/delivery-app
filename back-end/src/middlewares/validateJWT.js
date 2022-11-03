const jwt = require('jsonwebtoken');
const jwtkey = require('fs').readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' }); 

module.exports = async (req, _res, next) => {
  const token = req.header('Authorization');
  try {
    if (!token) return { error: { code: 401, message: { message: 'Token not found' } } };
    const data = jwt.verify(token, jwtkey);
    req.user = data;
    next();
  } catch (e) {
    return { error: { code: 401, message: { message: 'Expired or invalid token' } } }; 
  }
};

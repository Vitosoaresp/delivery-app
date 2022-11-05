const jwt = require('jsonwebtoken');
const jwtkey = require('fs').readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' }); 

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json({ message: 'Token not found' });
  try {
    const data = jwt.verify(token, jwtkey);
    req.user = data;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' }); 
  }
};

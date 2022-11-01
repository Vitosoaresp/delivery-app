const jwt = require('jsonwebtoken');
const jwtkey = require('fs').readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' }); 

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, jwtkey);
    return token;
  },

  validateToken: (token) => {
    try {
      if (!token) return { error: { code: 401, message: { message: 'Token not found' } } };
      const data = jwt.verify(token, jwtkey);
      return data;
    } catch (e) {
      return { error: { code: 401, message: { message: 'Expired or invalid token' } } }; 
    }
  },
};

module.exports = jwtService;
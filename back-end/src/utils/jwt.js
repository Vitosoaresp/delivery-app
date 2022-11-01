const jwt = require('jsonwebtoken');

const key = 'secret_key';

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, key);
    return token;
  },

  validateToken: (token) => {
    try {
      if (!token) return { error: { code: 401, message: { message: 'Token not found' } } };
      const data = jwt.verify(token, key);
      return data;
    } catch (e) {
      return { error: { code: 401, message: { message: 'Expired or invalid token' } } }; 
    }
  },
};

module.exports = jwtService;
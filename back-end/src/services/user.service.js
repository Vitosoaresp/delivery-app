const crypto = require('crypto');
const jwtService = require('../utils/jwt');

const { User } = require('../database/models');

const userService = {
  login: async (data) => {
    const passCryptor = crypto.createHash('md5').update(data.password).digest('hex');
    const user = await User.findOne({
      where: { email: data.email, password: passCryptor },
    });
    if (!user) return { status: 404, message: 'Not Found' };
    const token = jwtService.createToken({ userId: user.id });
    const result = { name: user.name, email: user.email, role: user.role };
    return { ...result, token };
  },

  create: async (data) => {
    const passCryptor = crypto.createHash('md5').update(data.password).digest('hex');
    const userVerifyName = await User.findOne({ where: { name: data.name } });
    const userVerifyEmail = await User.findOne({ where: { email: data.email } });
    if (userVerifyName || userVerifyEmail) {
      return { status: 409, message: 'User already registered' };
    }
    const newUser = await User.create({
      name: data.name, email: data.email, password: passCryptor, role: 'customer',
    });
    return newUser;
  },

  getIdByEmail: async (email) => {
    const user = await User.findOne({ where: { email } });
    return user.id;
  },
};

module.exports = userService;
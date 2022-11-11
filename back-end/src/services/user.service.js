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
    const result = { userId: user.id, name: user.name, email: user.email, role: user.role };
    const token = await jwtService.createToken(result);
    return { ...result, token };
  },

  create: async (data) => {
    const passCryptor = crypto.createHash('md5').update(data.password).digest('hex');
    const userVerifyName = await User.findOne({ where: { name: data.name } });
    const userVerifyEmail = await User.findOne({ where: { email: data.email } });
    if (userVerifyName || userVerifyEmail) {
      return { status: 409, message: 'User already registered' };
    }
    const userRole = !data.role ? 'customer' : data.role;
    const newUser = await User.create({
      name: data.name, email: data.email, password: passCryptor, role: userRole,
    });
    return newUser;
  },

  getAll: async () => {
    const users = await User.findAll();
    return users;
  },

  getIdByEmail: async (email) => {
    const user = await User.findOne({ where: { email } });
    return user.id;
  },

  getSellers: async () => {
    const sellers = await User.findAll({ where: { role: 'seller' } });
    return sellers;
  },
};

module.exports = userService;
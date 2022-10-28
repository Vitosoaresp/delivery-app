const crypto = require('crypto');

const { User } = require('../database/models');

const userService = {
  login: async (data) => {
    const passCryptor = crypto.createHash('md5').update(data.password).digest('hex');
    const user = await User.findOne({
      where: { email: data.email, password: passCryptor },
    });
    if (!user) return { status: 404, message: 'Not Found' };
    return user;
  },
};

module.exports = userService;
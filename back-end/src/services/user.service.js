const { User } = require('../database/models/user.model');

const userService = {
  login: async (data) => {
    const user = await User.findOne({
      where: { email: data.email },
    });
    return user;
  },
};

module.exports = userService;
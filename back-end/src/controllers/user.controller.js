const userService = require('../services/user.service');

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.login({ email, password });
    return res.status(201).json(user);
  },
};

module.exports = userController;
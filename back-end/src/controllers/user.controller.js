const userService = require('../services/user.service');

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.login({ email, password });
    const { status, message } = user;
    if (status && message) return res.status(status).json({ message });
    return res.status(200).json({ hasToken: false });
  },
};

module.exports = userController;
const userService = require('../services/user.service');

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.login({ email, password });
    const { status, message } = user;

    if (status && message) return res.status(status).json({ message });

    return res.status(200).json(user);
  },

  create: async (req, res) => {
    const { name, email, password } = req.body;

    const user = await userService.create({ name, email, password });
    const { status, message } = user;

    if (status && message) return res.status(status).json({ message });
    
    return res.status(201).json(user);
  },

  getSellers: async (_req, res) => {
    const sellers = await userService.getSellers();
    return res.status(200).json(sellers);
  },
};

module.exports = userController;
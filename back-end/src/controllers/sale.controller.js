const saleService = require('../services/sale.service');

const saleController = {
  create: async (req, res) => {
    const { data: { userId } } = req.user;
    const sale = await saleService.create({ userId, ...req.body });
    return res.status(201).json(sale);
  },
};

module.exports = saleController;
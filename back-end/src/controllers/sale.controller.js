const saleService = require('../services/sale.service');

const saleController = {
  create: async (req, res) => {
    const { data: { id } } = req.user;
    const sale = await saleService.create({ userId: id, ...req.body });
    return res.status(201).json(sale);
  },
  getSaleById: async (req, res) => {
    const { id } = req.params;
    const sale = await saleService.getSaleById(id);
    return res.status(200).json(sale);
  }
};

module.exports = saleController;
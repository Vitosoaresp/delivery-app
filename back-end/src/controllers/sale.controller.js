const saleService = require('../services/sale.service');

const saleController = {
  getAll: async (_req, res) => {
    const sales = await saleService.getAll();
    return res.status(200).json(sales);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const sale = await saleService.getById(id);
    return res.status(200).json(sale);
  },
};

module.exports = saleController;
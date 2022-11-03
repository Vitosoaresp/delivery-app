const saleService = require('../services/sale.service');

const saleController = {
  create: async (req, res) => {
    const { data } = req.user;
    const sale = await saleService.create({ userId: data.id, ...req.body });    
    return res.status(201).json(sale);
  },
};

module.exports = saleController;
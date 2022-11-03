const saleService = require('../services/sale.service');
const jwtService = require('../utils/jwt');

const saleController = {
  getAll: async (_req, res) => {
    const sales = await saleService.getAll();
    return res.status(200).json(sales);
  },

  getAllByUserId: async (req, res) => {
    const token = req.headers.authorization;
    const { userId } = jwtService.validateToken(token);
    const sales = await saleService.getAllByUserId(userId);
    return res.status(200).json(sales);
  },

  getById: async (req, res) => {
    const { saleId } = req.params;
    const token = req.headers.authorization;
    const { userId } = jwtService.validateToken(token);
    const sale = await saleService.getById(userId, saleId);
    return res.status(200).json(sale);
  },
};

module.exports = saleController;
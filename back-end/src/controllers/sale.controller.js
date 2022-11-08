const saleService = require('../services/sale.service');
const jwtService = require('../utils/jwt');

const saleController = {
  getAll: async (_req, res) => {
    const sales = await saleService.getAll();
    return res.status(200).json(sales);
  },

  getAllByUserId: async (req, res) => {
    const { data: { userId } } = req.user;
    const sales = await saleService.getAllByUserId(userId);
    return res.status(200).json(sales);
  },

  getUniqueById: async (req, res) => {
    try {
      const { saleId } = req.params;
      const token = req.headers.authorization;
      const { data: { userId } } = req.user;
      console.log(userId);
      const sale = await saleService.getById(userId, saleId);
      return res.status(200).json(sale);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    const { data: { userId } } = req.user;
    const sale = await saleService.create({ userId, ...req.body });
    return res.status(201).json(sale);
  },
};

module.exports = saleController;
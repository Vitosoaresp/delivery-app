const saleService = require('../services/sale.service');

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
    const { saleId } = req.params;
    const { data: { userId } } = req.user;
    const sale = await saleService.getById(userId, saleId);
    return res.status(200).json(sale);
  },

  create: async (req, res) => {
    const { data: { userId } } = req.user;
    const sale = await saleService.create({ userId, ...req.body });
    return res.status(201).json(sale);
  },

  getBySeller: async (req, res) => {
    const { id } = req.params;
    const sales = await saleService.getBySeller(id);
    return res.status(200).json(sales);
  },
};

module.exports = saleController;
const { Sale } = require('../database/models');

const saleService = {
  getAll: async () => {
    const sales = await Sale.findAll();
    return sales;
  },

  getAllByUserId: async (userId) => {
    const sales = await Sale.findAll({ where: { userId } });
    return sales;
  },

  getById: async (userId, saleId) => {
    const sale = await Sale.findByPk(saleId, { where: { userId } });
    if (!sale) return { message: 'Sale not found' };
    return sale;
  },
};

module.exports = saleService;
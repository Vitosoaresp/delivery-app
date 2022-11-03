const { Sale } = require('../database/models');

const saleService = {
  getAll: async () => {
    const sales = await Sale.findAll();
    return sales;
  },

  getById: async (id) => {
    const sale = await Sale.findByPk(id);
    if (!sale) return { message: 'Sale not found' };
    return sale;
  },
};

module.exports = saleService;
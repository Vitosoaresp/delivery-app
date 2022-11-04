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

  create: async (data) => {
    const { userId, totalPrice, deliveryAddress, deliveryNumber } = data;
    const status = 'Pendente';
    const saleDate = new Date();
    const newSale = await Sale.create({
      userId, sellerId: 2, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
    });
    return { id: newSale.id };
  },
};

module.exports = saleService;
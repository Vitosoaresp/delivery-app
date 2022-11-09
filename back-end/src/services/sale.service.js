const Sequelize = require('sequelize');
const saleProductService = require('./saleProduct.service');
const { Sale } = require('../database/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../database/config/config');

const sequelize = new Sequelize(config[env]);

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
    const sale = await Sale.findByPk(saleId, {
      where: { userId },
      include: { association: 'sales' },
    });
    if (!sale) return { message: 'Sale not found' };
    return sale;
  },

  create: async (data) => {
    const t = await sequelize.transaction();
    try {
      const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart } = data;
      const status = 'Pendente';
      const newSale = await Sale.create({
        userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status,
      }, { transaction: t });
      cart.forEach(async ({ id, quantity }) => {
        await saleProductService.create(
          { saleId: newSale.id, productId: id, quantity }, { transaction: t },
        );
      });
      await t.commit();
      return newSale;
    } catch (error) {
      await t.rollback();
    }
  },

  getBySeller: async (id) => {
    const sales = await Sale.findAll({ where: { sellerId: id } });
    return sales;
  },
};

module.exports = saleService;
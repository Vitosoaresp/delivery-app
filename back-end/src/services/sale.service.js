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
      include: [
        {
          all: true, nested: true,
        },
      ],
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
 
  getSaleById: async (id) => {
    try {
      const sale = await Sale.findOne({ where: { id }, include: { all: true } });
      if (!sale) return { error: 'Sale not found' };
      return sale;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getBySeller: async (id) => {
    const sales = await Sale.findAll({ where: { sellerId: id } });
    return sales;
  },

  // atualizar status da venda
  updateStatus: async (id, status) => {
    const sale = await Sale.update({ status }, { where: { id } });
    return sale;
  }
};

module.exports = saleService;
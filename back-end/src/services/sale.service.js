const Sequelize = require('sequelize');
// const moment = require('moment');
const saleProductService = require('./saleProduct.service');
const { Sale } = require('../database/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../database/config/config');

const sequelize = new Sequelize(config[env]);

const saleService = {
  create: async (data) => {
    const t = await sequelize.transaction();
    try {
      const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart } = data;
      const status = 'Pendente';
      // const saleDate = moment().toISOString();
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
};

module.exports = saleService;
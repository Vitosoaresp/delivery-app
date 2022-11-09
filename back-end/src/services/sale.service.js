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
  // retornar venda por Id e incluir os produtos dessa venda
  getSaleById: async (id) => {
    try {
      const sale = await Sale.findOne({ where: { id }, include: { all: true } });
      if (!sale) return { error: 'Sale not found' };
      return sale;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

module.exports = saleService;
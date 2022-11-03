// const jwtService = require('../utils/jwt');

const { Sale } = require('../database/models');

const saleService = {
  create: async (data) => {
    const { userId, totalPrice, deliveryAddress, delineryNumber, saleDate, status } = data;
    const newSale = await Sale.create({
        userId, sellerId: 2, totalPrice, deliveryAddress, delineryNumber, saleDate, status,
    });
    return newSale.id;
  },
};

module.exports = saleService;
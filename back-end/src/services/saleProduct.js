const { SaleProduct } = require('../database/models');

const saleProductService = {
  create: async (data) => {
    const { saleId, productId, quantity } = data;
    const saleProduct = await SaleProduct.create({ saleId, productId, quantity });
    return saleProduct;
  },
};

module.exports = saleProductService;
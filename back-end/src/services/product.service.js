const { Product } = require('../database/models');

const productService = {
  getAll: async () => {
    const products = await Product.findAll();
    return products;
  },
};

module.exports = productService;
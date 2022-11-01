const productService = require('../services/product.service');

const productController = {
  getAll: async (_req, res) => {
    const products = await productService.getAll();
    return res.status(200).json(products);
  },
};

module.exports = productController;
const saleProductService = require('../services/saleProduct.service');

const saleProductController = {
  create: async (req, res) => {
    console.log(req.body);
    const saleProduct = await saleProductService.create(req.body);
    return res.status(201).json(saleProduct);
  },
};

module.exports = saleProductController;
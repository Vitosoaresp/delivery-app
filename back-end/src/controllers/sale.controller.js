const saleService = require('../services/sale.service');

const saleController = {
  create: async (req, res) => {
    // const { data } = req.user;
    console.log(req.headers.authorization);
    const sale = await saleService.create({ userId: 1, ...req.body.data });    
    return res.status(201).json(sale);
  },
};

module.exports = saleController;
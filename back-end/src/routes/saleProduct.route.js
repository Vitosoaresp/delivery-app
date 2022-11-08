const { Router } = require('express');
const saleProductController = require('../controllers/saleProduct.controller');

const router = Router();

router.post('/sales/products', saleProductController.create);

module.exports = router;
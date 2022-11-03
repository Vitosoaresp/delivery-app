const { Router } = require('express');

const saleController = require('../controllers/sale.controller');

const router = Router();

router.get('/sales', saleController.getAll);
router.get('/sales/:userId', saleController.getAllByUserId);
router.get('/sales/:userId/:saleId', saleController.getById);

module.exports = router;
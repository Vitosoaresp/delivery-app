const { Router } = require('express');

const saleController = require('../controllers/sale.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

router.get('/sales/seller/:id', saleController.getBySeller);
router.get('/sales', validateJWT, saleController.getAllByUserId);
router.get('/sales/:saleId', validateJWT, saleController.getUniqueById);
router.post('/sales', validateJWT, saleController.create);
router.get('/seller/orders/:id', saleController.getSaleById);

module.exports = router;

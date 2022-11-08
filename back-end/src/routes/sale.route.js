const { Router } = require('express');

const saleController = require('../controllers/sale.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

router.get('/sales', validateJWT, saleController.getAllByUserId);
// router.get('/sales/:userId', saleController.getAllByUserId);
router.get('/sales/:saleId', validateJWT, saleController.getUniqueById);
router.post('/sales', validateJWT, saleController.create);

module.exports = router;

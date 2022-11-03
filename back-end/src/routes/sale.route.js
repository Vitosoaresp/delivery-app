const { Router } = require('express');
const saleController = require('../controllers/sale.controller');

const validateJWT = require('../middlewares/validateJWT');

const router = Router();

router.post('/sales', validateJWT, saleController.create);

module.exports = router;
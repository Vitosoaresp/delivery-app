const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.get('/users/sellers', userController.getSellers);
router.post('/login', userController.login);
router.post('/register', userController.create);

module.exports = router;
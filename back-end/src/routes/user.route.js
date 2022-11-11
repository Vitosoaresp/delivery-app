const { Router } = require('express');
const userController = require('../controllers/user.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

router.get('/users/sellers', userController.getSellers);
router.get('/users', userController.getAll);
router.post('/login', userController.login);
router.post('/register', userController.create);
router.post('/admin/register', validateJWT, userController.create);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateIdParam, validateEmailAndPassword } = require('../middlewares/validateFilds');


router.post('/', validateEmailAndPassword(), userController.store);

router.get('/', userController.index);

router.get('/:id', validateIdParam(), userController.show);

router.post('/login', validateEmailAndPassword(), userController.login);

module.exports = router;

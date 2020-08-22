const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateIdParam, validateEmailAndPassword } = require('../middlewares/validateFilds');

router.delete('/:id', validateIdParam(), validateEmailAndPassword(), userController.destroy);

router.put('/:id', validateIdParam(), validateEmailAndPassword(), userController.update);

router.patch('/:id', validateIdParam(), validateEmailAndPassword(), userController.update);

router.get('/index', userController.index);

router.get('/:id', validateIdParam(), userController.show);

module.exports = router;

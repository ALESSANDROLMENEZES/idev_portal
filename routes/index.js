const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);
router.get('/', userController.show);
router.post('/', userController.store);
router.post('/login', userController.login);

module.exports = router;

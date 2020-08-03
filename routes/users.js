const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.delete('/:id', userController.destroy);
router.put('/:id', userController.update);
router.patch('/:id', userController.update);
router.get('/all', userController.index);
router.get('/:id?', userController.show);

module.exports = router;

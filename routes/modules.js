const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleClassesController');

router.post('/', moduleController.store);
router.delete('/', moduleController.destroy);

module.exports = router;

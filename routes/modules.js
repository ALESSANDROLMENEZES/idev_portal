const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleClassesController');
const userModuleController = require('../controllers/userModuleController');

router.post('/', moduleController.store);
router.delete('/', moduleController.destroy);
router.post('/usermodule', userModuleController.store);
router.get('/usermodule', userModuleController.index);
router.destroy('/usermodule/:userId/:moduleId', userModuleController.destroy);

module.exports = router;

const express = require('express');
const router = express.Router();
const askForHelpController = require('../controllers/askForHelpController');
const userClassDoneController = require('../controllers/userClassDoneController');

router.get('/helps', askForHelpController.index);
router.get('/classdone/:param/:id', userClassDoneController.index);
router.post('/', askForHelpController.store);
router.patch('/', askForHelpController.update);
router.put('/', askForHelpController.update);
router.delete('/:id', askForHelpController.destroy);

module.exports = router;

const express = require('express');
const router = express.Router();
const askForHelpController = require('../controllers/askForHelpController');
const userClassDoneController = require('../controllers/userClassDoneController');
const { validateIdParam, validateHelps, validateAvaliableHelps } = require('../middlewares/validateFilds');

router.get('/helps', askForHelpController.index);

router.post('/helps', validateHelps(), askForHelpController.store);

router.put('/helps/:id', validateIdParam(), validateHelps(), askForHelpController.update);

router.patch('/helps/:id', validateIdParam(), validateHelps(), validateAvaliableHelps(), askForHelpController.update);

router.get('/classdone', userClassDoneController.index);

router.delete('/helps/:id', validateIdParam(), askForHelpController.destroy);

module.exports = router;

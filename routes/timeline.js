const express = require('express');
const router = express.Router();
const askForHelpController = require('../controllers/askForHelpController');
const userClassDoneController = require('../controllers/userClassDoneController');
const { check, param } = require('express-validator');

router.get('/helps', askForHelpController.index);

router.post('/helps', [
    check('title', 'Informe um título que tenha entre 5 e 255 caracteres').isLength({ min: 5, max: 255 }),
    check('description', 'Informe uma descrição que tenha entre 5 e 255 caracteres').isLength({ min: 5, max: 255 })
], askForHelpController.store);

router.put('/helps/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('title', 'Informe um título que tenha entre 5 e 255 caracteres').isLength({ min: 5, max: 255 }),
    check('description', 'Informe uma descrição que tenha entre 5 e 255 caracteres').isLength({ min: 5, max: 255 }),
    check('avaliable', 'Informe um boleano para indicar se o pedido está em aberto').isBoolean()
], askForHelpController.update);

router.patch('/helps/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('title', 'Informe um título que tenha entre 5 e 255 caracteres').isLength({ min: 5, max: 255 }),
    check('description', 'Informe uma descrição que tenha entre 5 e 255 caracteres').isLength({ min: 5, max: 255 }),
    check('avaliable', 'Informe um boleano para indicar se o pedido está em aberto').isBoolean()
], askForHelpController.update);

router.get('/classdone', userClassDoneController.index);

router.delete('/helps/:id', [
    param('id', 'Informe um id numérico').isNumeric()
], askForHelpController.destroy);

module.exports = router;

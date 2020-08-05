const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const userModuleController = require('../controllers/userModuleController');
const { check, param } = require('express-validator');


router.get('/all', moduleController.index);

router.get('/usermodules', userModuleController.index);

router.post('/', [
    check('title', 'Informe um título para o módulo de até 80 caracteres').isLength({ min: 1, max: 80 }),
    check('avaliable', 'Informe se o módulo ficará disponível').isBoolean(),
], moduleController.store);

router.delete('/:id', [
    param('id', 'Informe um id numérico').isNumeric()
], moduleController.destroy);

router.post('/usermodule', [
    check('userId','Informe um id numérico para o usuário').isNumeric(),
    check('moduleId','Informe um id numérico para o módulo').isNumeric(),
], userModuleController.store);

router.delete('/usermodule/:userId/:moduleId', [
    param('userId','Informe um id numérico para o usuário').isNumeric(),
    param('moduleId','Informe um id numérico para o módulo').isNumeric(),
], userModuleController.destroy);

module.exports = router;

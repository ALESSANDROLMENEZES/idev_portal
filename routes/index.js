const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check, param } = require('express-validator');


router.post('/', [
    check('email','Informe um email válido').isEmail(),
    check('password','Informe uma senha de no mínimo 6 caracteres').isLength({min:6})
], userController.store);

router.get('/', userController.index);

router.get('/:id', [
    param('id', 'Informe o id numérico do usuário').isNumeric()
], userController.show);

router.post('/login', [
    check('email','Informe um email válido').isEmail(),
    check('password','Informe uma senha').isLength({min:1})
], userController.login);

module.exports = router;

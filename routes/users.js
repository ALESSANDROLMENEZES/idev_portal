const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check, param } = require('express-validator');

router.delete('/:id',[
    param('id', 'Informe um id numérico').isNumeric(),
    check('password', 'Informe sua senha').isLength({min:3, max:45}),
    check('email', 'Informe seu email').isEmail(),
], userController.destroy);

router.put('/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('name', 'Informe um nome que tenha entre 3 e 45 caracteres').isLength({ min: 3, max: 255 }),
    check('email', 'Informe um email válido').isEmail()
], userController.update);

router.patch('/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('name', 'Informe um nome que tenha entre 3 e 45 caracteres').isLength({ min: 3, max: 255 }),
    check('email', 'Informe um email válido').isEmail()
], userController.update);

router.get('/index', userController.index);

router.get('/:id', [
    param('id', 'Informe um id numérico').isNumeric()
], userController.show);

module.exports = router;

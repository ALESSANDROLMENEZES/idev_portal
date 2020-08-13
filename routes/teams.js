const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const teamUserController = require('../controllers/teamUserController');
const { check, param } = require('express-validator');

router.get('/index', teamController.index);

router.get('/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
], teamController.show);

router.post('/', [
    check('challengeId', 'Informe um id do desafio').isNumeric(),
    check('statusId', 'Informe um id do status de feedback').isNumeric()
], teamController.store);

router.patch('/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('challengeId', 'Informe um id do desafio').isNumeric(),
    check('github', 'Informe o link do desafio').isURL(),
    check('statusId', 'Informe um id do status de feedback').isNumeric()
], teamController.update);

router.delete('/:id', [
    param('id', 'Informe um id numérico').isNumeric()
], teamController.destroy);

router.put('/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('challengeId', 'Informe um id do desafio').isNumeric(),
    check('github', 'Informe o link do desafio').isURL(),
    check('statusId', 'Informe um id do status de feedback').isNumeric()
], teamController.update);

router.post('/teamusers/store', [
    check('teamId', 'Informe o id do time ou 0 para ser criado um novo time').isNumeric(),
    check('userId', 'Informe um id do usuário a ser adicionado no time').isNumeric(),
    check('challengeId', 'Informe o id do desafio').isNumeric()
], teamUserController.store);

router.delete('/teamusers/:teamId/:userId', [
    param('teamId', 'Informe o id do time ou 0 para ser criado um novo time').isNumeric(),
    param('userId', 'Informe um id do usuário a ser adicionado no time').isNumeric()
], teamUserController.destroy);

module.exports = router;

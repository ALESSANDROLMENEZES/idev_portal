const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const challengeStatusController = require('../controllers/challengeStatusController');
const { check, param } = require('express-validator');

router.get('/all', challengeController.index);

router.get('/:id', [
    param('id', 'Informe o id em formato numérico').isNumeric()
], challengeController.show);

router.post('/', [
    check('title', 'Informe um título de até 80 caracter').isLength({min:1,max:80}),
    check('subtitle', 'Informe um subtitulo de até 80 caracter').isLength({min:1,max:80}),
    check('slides', 'Informe um link do google slides').isLength({min:1,max:255}),
    check('text', 'Informe o texto explicativo').isLength({min:1}),
    check('score', 'Informe o score de pontuação para este desafio com valor numérico').isNumeric(),
    check('xp', 'Informe o xp a ser pontuado com esse desafio com valor numérico').isNumeric(),
    check('moduleId', 'Informe o id de um módulo para vincular esse desafio').isNumeric(),
    check('statusId', 'Informe o id de um status para esse desafio').isNumeric(),
], challengeController.store);

router.patch('/:id', [
    param('id', 'Informe o id em formato numérico').isNumeric(),
    check('title', 'Informe um título de até 80 caracter').isLength({min:1,max:80}),
    check('subtitle', 'Informe um subtitulo de até 80 caracter').isLength({min:1,max:80}),
    check('slides', 'Informe um link do google slides de até 255 caracter').isLength({min:1,max:255}),
    check('text', 'Informe o texto explicativo').isLength({min:1}),
    check('score', 'Informe o score de pontuação para este desafio com valor numérico').isNumeric(),
    check('xp', 'Informe o xp a ser pontuado com esse desafio com valor numérico').isNumeric(),
    check('moduleId', 'Informe o id de um módulo para vincular esse desafio').isNumeric(),
    check('statusId', 'Informe o id de um status para esse desafio').isNumeric(),
], challengeController.update);

router.put('/:id', [
    param('id', 'Informe o id em formato numérico').isNumeric(),
    check('title', 'Informe um título de até 80 caracter').isLength({min:1,max:80}),
    check('subtitle', 'Informe um subtitulo de até 80 caracter').isLength({min:1,max:80}),
    check('slides', 'Informe um link do google slides de até 255 caracter').isLength({min:1,max:255}),
    check('text', 'Informe o texto explicativo').isLength({min:1}),
    check('score', 'Informe o score de pontuação para este desafio com valor numérico').isNumeric(),
    check('xp', 'Informe o xp a ser pontuado com esse desafio com valor numérico').isNumeric(),
    check('moduleId', 'Informe o id de um módulo para vincular esse desafio').isNumeric(),
    check('statusId', 'Informe o id de um status para esse desafio').isNumeric(),
], challengeController.update);

router.delete('/:id', [
    param('id', 'Informe o id em formato numérico').isNumeric()
], challengeController.destroy);

router.post('/status', [
    check('description', 'Informe uma descrição de até 45 caracter').isLength({min:1, max:45}),
], challengeStatusController.store);

router.get('/status/all', challengeStatusController.index);

router.get('/status/:id', [
    param('id', 'Informe o id em formato numérico').isNumeric()
], challengeStatusController.show);

router.delete('/status/:id', [
    param('id', 'Informe o id em formato numérico').isNumeric()
], challengeStatusController.destroy);

router.put('/status/:id', [
    param('id', 'Informe o id em formato numérico').isNumeric(),
    check('description', 'Informe uma descrição de até 45 caracter').isLength({min:1, max:45})
], challengeStatusController.update);

router.patch('/status/:id', [
    param('id', 'Informe o id em formato numérico').isNumeric(),
    check('description', 'Informe uma descrição de até 45 caracter').isLength({min:1, max:45}),
], challengeStatusController.update);

module.exports = router;

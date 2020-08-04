const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const challengeStatusController = require('../controllers/challengeStatusController');
const { check, validationResult } = require('express-validator');

router.get('/all', challengeController.index);
router.get('/:id', challengeController.show);

router.post('/', [
    check('title', 'Informe um título de até 80 caracter').isLength({min:1,max:80}),
    check('subtitle', 'Informe um subtitulo de até 80 caracter').isLength({min:1,max:80}),
    check('slides', 'Informe um link do google slides').isLength({min:1,max:255}),
    check('text', 'Informe o texto explicativo').isLength({min:1}),
    check('score', 'Informe o score de pontuação para este desafio com valor numérico').isNumeric(),
    check('xp', 'Informe o xp a ser pontuado com esse desafio com valor numérico').isNumeric(),
    check('moduleId', 'Informe o id de um módulo para vincular esse desafio').isNumeric(),
    check('statusId', 'Informe o id de um status para esse desafio').isNumeric(),
] ,challengeController.store);

router.patch('/', [
    check('title', 'Informe um título de até 80 caracter').isLength({min:1,max:80}),
    check('subtitle', 'Informe um subtitulo de até 80 caracter').isLength({min:1,max:80}),
    check('slides', 'Informe um link do google slides').isLength({min:1,max:255}),
    check('text', 'Informe o texto explicativo').isLength({min:1}),
    check('score', 'Informe o score de pontuação para este desafio com valor numérico').isNumeric(),
    check('xp', 'Informe o xp a ser pontuado com esse desafio com valor numérico').isNumeric(),
    check('moduleId', 'Informe o id de um módulo para vincular esse desafio').isNumeric(),
    check('statusId', 'Informe o id de um status para esse desafio').isNumeric(),
] ,challengeController.update);

router.put('/', [
    check('title', 'Informe um título de até 80 caracter').isLength({min:1,max:80}),
    check('subtitle', 'Informe um subtitulo de até 80 caracter').isLength({min:1,max:80}),
    check('slides', 'Informe um link do google slides').isLength({min:1,max:255}),
    check('text', 'Informe o texto explicativo').isLength({min:1}),
    check('score', 'Informe o score de pontuação para este desafio com valor numérico').isNumeric(),
    check('xp', 'Informe o xp a ser pontuado com esse desafio com valor numérico').isNumeric(),
    check('moduleId', 'Informe o id de um módulo para vincular esse desafio').isNumeric(),
    check('statusId', 'Informe o id de um status para esse desafio').isNumeric(),
] ,challengeController.update);

router.delete('/:id', challengeController.destroy);
router.post('/status', challengeStatusController.store);
router.get('/status/all', challengeStatusController.index);
router.get('/status/:id', challengeStatusController.show);
router.delete('/status/:id', challengeStatusController.destroy);
router.put('/status/:id', challengeStatusController.update);
router.patch('/status/:id', challengeStatusController.update);

module.exports = router;

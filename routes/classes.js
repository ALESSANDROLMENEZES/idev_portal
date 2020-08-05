const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { check, param } = require('express-validator');

router.get('/all/:moduleId', [
    param('moduleId', 'Informe o id numérico de um módulo').isNumeric()
], classController.index);

router.get('/:id', [
    param('id', 'Informe o id numérico da aula').isNumeric()
], classController.show);

router.post('/:moduleId', [
    param('moduleId', 'Informe o id do módulo para vincular a aula').isNumeric(),
    check('title','Informe um título para a aula').isLength({min:1, max:80}),
    check('subtitle','Informe um subtítulo para a aula').isLength({min:1, max:80}),
    check('slides','Informe um link para slides menor que 255 caracteres').isLength({max:255}),
    check('video','Informe um link para video menor que 255 caracteres').isLength({min:1, max:255}),
    check('score','Informe um score numérico para a aula').isNumeric(),
    check('xp','Informe um xp numérico para a aula').isNumeric(),
], classController.store);

router.patch('/:id', [
    param('id', 'Informe o id numérico da aula').isNumeric(),
    check('title','Informe um título para a aula').isLength({min:1, max:80}),
    check('subtitle','Informe um subtítulo para a aula').isLength({min:1, max:80}),
    check('slides','Informe um link para slides menor que 255 caracteres').isLength({max:255}),
    check('video','Informe um link para video menor que 255 caracteres').isLength({min:1, max:255}),
    check('score','Informe um score numérico para a aula').isNumeric(),
    check('xp','Informe um xp numérico para a aula').isNumeric(),
], classController.update);

router.put('/:id', [
    param('id', 'Informe o id numérico da aula').isNumeric(),
    check('title','Informe um título para a aula').isLength({min:1, max:80}),
    check('subtitle','Informe um subtítulo para a aula').isLength({min:1, max:80}),
    check('slides','Informe um link para slides menor que 255 caracteres').isLength({max:255}),
    check('video','Informe um link para video menor que 255 caracteres').isLength({min:1, max:255}),
    check('score','Informe um score numérico para a aula').isNumeric(),
    check('xp','Informe um xp numérico para a aula').isNumeric(),
], classController.update);

router.delete('/:id', [
    param('id', 'Informe o id numérico da aula').isNumeric()
], classController.destroy);

module.exports = router;

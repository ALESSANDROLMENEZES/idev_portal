const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const feedbackStatusController = require('../controllers/feedbackStatusController');
const { check, param } = require('express-validator');

router.get('/all', feedbackController.index);

router.get('/:id', [
    param('id', 'Informe o id numérico do feedback').isNumeric()
], feedbackController.show);

router.post('/:teamId', [
    check('teamId', 'Informe o id numérico do time').isNumeric(),
    check('score', 'Score é campo obrigatório, se for avaliar mais tarde informe a nota 0').isNumeric(),
    check('statusId', 'Informe o statusId, valor 0 ou 1, sendo 0 se for finalizar a avaliação e 1 se for continuar avaliando mais tarde').isNumeric(),
], feedbackController.store);

router.patch('/:id', [
    param('id', 'Informe o id numérico do feedback').isNumeric(),
    check('score', 'Score é um campo obrigatório').isNumeric(),
    check('comment', 'Comentário é um campo obrigatório').isLength({min:5, max:500})
], feedbackController.update);

router.put('/:id',[
    param('id', 'Informe o id numérico do feedback').isNumeric(),
    check('score', 'Score é um campo obrigatório').isNumeric(),
    check('comment', 'Comentário é um campo obrigatório').isLength({min:5, max:500})
], feedbackController.update);

router.delete('/:id',[
    param('id', 'Informe o id numérico do feedback').isNumeric()
], feedbackController.destroy);

router.post('/status', [
    check('description', 'Informe uma descrição de até 45 caracteres').isLength({min:1, max:45})
], feedbackStatusController.store);

router.get('/status/all', feedbackStatusController.index);

router.get('/status/:id',[
    param('id', 'Informe o id numérico do status').isNumeric()
], feedbackStatusController.show);

router.delete('/status/:id',[
    param('id', 'Informe o id numérico do status').isNumeric()
], feedbackStatusController.destroy);

router.put('/status/:id',[
    param('id', 'Informe o id numérico do status').isNumeric()
], feedbackStatusController.update);

router.patch('/status/:id',[
    param('id', 'Informe o id numérico do status').isNumeric()
], feedbackStatusController.update);

module.exports = router;

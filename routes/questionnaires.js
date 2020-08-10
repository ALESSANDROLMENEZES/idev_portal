const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');
const answerController = require('../controllers/answerController');
const { check, param } = require('express-validator');

router.get('/all/:classId/:questionId', [
    param('classId','Informe o id da aula para listar o questionário').isNumeric(),
    param('questionId','Informe o id da questão').isNumeric(),
], questionnaireController.index);

router.get('/:id', [
    param('id', 'Informe um id numérico').isNumeric()
], questionnaireController.show);

router.post('/complete', questionnaireController.storeAnswersAndLinkAllToQuestionAndQuestionnaire);

router.post('/', [
    check('classId', 'Informe o id da aula').isNumeric(),
    check('title', 'Informe um título de até 45 caracter').isLength({ min: 1, max: 45 }),
    check('avaliable', 'Informe um boleano com o valor true se a aula ficará disponível ou false').isBoolean()
], questionnaireController.store);

router.patch('/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('classId', 'Informe o id da aula').isNumeric(),
    check('title', 'Informe um título de até 45 caracter').isLength({ min: 1, max: 45 }),
    check('avaliable', 'Informe um boleano com o valor true se a aula ficará disponível ou false').isBoolean()
], questionnaireController.update);

router.delete('/:id', [
    param('id', 'Informe um id numérico').isNumeric()
], questionnaireController.destroy);

router.put('/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('classId', 'Informe o id da aula').isNumeric(),
    check('title', 'Informe um título de até 45 caracter').isLength({ min: 1, max: 45 }),
    check('avaliable', 'Informe um boleano com o valor true se a aula ficará disponível ou false').isBoolean()
], questionnaireController.update);

router.get('/aswers/all', answerController.index);

router.get('/aswers/:id', [
    param('id', 'Informe um id numérico').isNumeric()
], answerController.show);

router.delete('/aswers/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
], answerController.destroy);

router.post('/aswers/:questionId', [
    param('questionId', 'Informe um id numérico para a questão').isNumeric(),
    check('description', 'Informe uma descrição para a resposta').isLength({min:1, max:255}),
    check('avaliable', 'Informe se a resposta ficará disponível').isBoolean()
], answerController.store);

router.put('/aswers/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('description', 'Informe uma descrição para a resposta').isLength({min:1, max:255}),
    check('avaliable', 'Informe se a resposta ficará disponível').isBoolean()
], answerController.update);

router.patch('/aswers/:id', [
    param('id', 'Informe um id numérico').isNumeric(),
    check('description', 'Informe uma descrição para a resposta').isLength({min:1, max:255}),
    check('avaliable', 'Informe se a resposta ficará disponível').isBoolean()
], answerController.update);

module.exports = router;

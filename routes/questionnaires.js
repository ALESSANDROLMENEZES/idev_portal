const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');
const answerController = require('../controllers/answerController');
const userAnsweredController = require('../controllers/userAnsweredController');
const { validateGetQuestionnaire, validateIdParam, validateQuestionnaire, validateQuestionidParam } = require('../middlewares/validateFilds');

router.get('/index/:classId/:questionId', validateGetQuestionnaire(), questionnaireController.index);

router.get('/:id', validateIdParam(), questionnaireController.show);

router.get('/aswers/index', answerController.index);

router.get('/aswers/:id', validateIdParam(), answerController.show);

router.post('/useranswers', userAnsweredController.store);



//Auth here to authenticate next routes



router.post('/complete', questionnaireController.storeAnswersAndLinkAllToQuestionAndQuestionnaire);

router.post('/', validateQuestionnaire(), questionnaireController.store);

router.patch('/:id', validateIdParam(), validateQuestionnaire(), questionnaireController.update);

router.delete('/:id', validateIdParam(), questionnaireController.destroy);

router.put('/:id', validateIdParam(), validateQuestionnaire(), questionnaireController.update);

router.delete('/aswers/:id', validateIdParam(), answerController.destroy);

router.post('/aswers/:questionId', validateQuestionidParam(), validateAnswer(), answerController.store);

router.put('/aswers/:id', validateIdParam(), validateAnswer(), answerController.update);

router.patch('/aswers/:id', validateIdParam(), validateAnswer(), answerController.update);

module.exports = router;

const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');
const aswerController = require('../controllers/answerController');

router.get('/all/:classId/:questionId', questionnaireController.index);
router.get('/:id', questionnaireController.show);
router.post('/complete', questionnaireController.storeAnswersAndLinkAllToQuestionAndQuestionnaire);
router.post('/', questionnaireController.store);
router.patch('/:id', questionnaireController.update);
router.delete('/:id', questionnaireController.destroy);
router.put('/:id', questionnaireController.update);
router.get('/aswers/all', aswerController.index);
router.get('/aswers/:id', aswerController.show);
router.delete('/aswers/:id', aswerController.destroy);
router.post('/aswers', aswerController.store);
router.put('/aswers/:id', aswerController.update);
router.patch('/aswers/:id', aswerController.update);

module.exports = router;

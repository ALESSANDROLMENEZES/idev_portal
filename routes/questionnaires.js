const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaireController');

router.get('/all/:classId/:questionId', questionnaireController.index);
router.get('/:id', questionnaireController.show);
router.post('/complete', questionnaireController.storeAnswersAndLinkAllToQuestionAndQuestionnaire);
router.post('/', questionnaireController.store);
router.patch('/', questionnaireController.update);
router.delete('/:id', questionnaireController.destroy);
router.put('/', questionnaireController.update);

module.exports = router;

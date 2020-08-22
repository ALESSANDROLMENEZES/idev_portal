const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const feedbackStatusController = require('../controllers/feedbackStatusController');
const {
    validateIdParam,
    validateNewFeedback,
    validateTemIdParam,
    validateUpdateFeedback,
    validateStatus
} = require('../middlewares/validateFilds');

router.get('/index', feedbackController.index);

router.get('/:id', validateIdParam(), feedbackController.show);

router.get('/status/list/index', feedbackStatusController.index);

router.post('/:teamId', validateTemIdParam(), validateNewFeedback(), feedbackController.store);

router.patch('/:id', validateIdParam(), validateUpdateFeedback(), feedbackController.update);

router.put('/:id', validateIdParam(), validateUpdateFeedback(), feedbackController.update);

router.delete('/:id', validateIdParam(), feedbackController.destroy);

router.get('/status/:id', validateIdParam(), feedbackStatusController.show);



//Auth here to authenticate next routes


router.post('/status/store', validateStatus(), feedbackStatusController.store);

router.delete('/status/:id', validateIdParam(), feedbackStatusController.destroy);

router.put('/status/:id', validateIdParam(), validateStatus(), feedbackStatusController.update);

router.patch('/status/:id', validateIdParam(), validateStatus(), feedbackStatusController.update);

module.exports = router;

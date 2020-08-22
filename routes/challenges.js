const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const challengeStatusController = require('../controllers/challengeStatusController');
const { validateIdParam, validateChallenge, validateStatus } = require('../middlewares/validateFilds');


router.get('/index', challengeController.index);

router.get('/status/index', challengeStatusController.index);

router.get('/status/:id', validateIdParam(), challengeStatusController.show);

router.get('/:id',  validateIdParam(), challengeController.show);



//Auth here to authenticate next routes


router.post('/', validateChallenge(), challengeController.store);

router.patch('/:id', validateIdParam(), validateChallenge(), challengeController.update);

router.put('/:id', validateIdParam(), validateChallenge(), challengeController.update);

router.delete('/:id', validateIdParam(), challengeController.destroy);

router.post('/status', validateStatus(), challengeStatusController.store);

router.delete('/status/:id', validateIdParam(), challengeStatusController.destroy);

router.put('/status/:id', validateIdParam(),  validateChallenge(), challengeStatusController.update);

router.patch('/status/:id', validateIdParam(),  validateChallenge(), challengeStatusController.update);

module.exports = router;

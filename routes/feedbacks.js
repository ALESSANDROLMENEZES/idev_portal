const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const feedbackStatusController = require('../controllers/feedbackStatusController');

router.get('/all', feedbackController.index);
router.get('/:id', feedbackController.show);
router.post('/', feedbackController.store);
router.patch('/:id', feedbackController.store);
router.delete('/:id', feedbackController.destroy);
router.put('/:id', feedbackController.store);
router.post('/status', feedbackStatusController.store);
router.get('/status/all', feedbackStatusController.index);
router.get('/status/:id', feedbackStatusController.show);
router.delete('/status/:id', feedbackStatusController.destroy);
router.put('/status/:id', feedbackStatusController.update);
router.patch('/status/:id', feedbackStatusController.update);

module.exports = router;

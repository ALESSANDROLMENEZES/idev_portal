const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const challengeStatusController = require('../controllers/challengeStatusController');

router.get('/all', challengeController.index);
router.get('/:id', challengeController.show);
router.post('/', challengeController.store);
router.patch('/', challengeController.update);
router.delete('/:id', challengeController.destroy);
router.put('/', challengeController.update);
router.post('/status', challengeStatusController.store);
router.get('/status/all', challengeStatusController.index);
router.get('/status/:id', challengeStatusController.show);
router.delete('/status/:id', challengeStatusController.destroy);
router.put('/status/:id', challengeStatusController.update);
router.patch('/status/:id', challengeStatusController.update);

module.exports = router;

const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
router.get('/all', challengeController.index);
router.get('/:id', challengeController.show);
router.post('/', challengeController.store);
router.patch('/', challengeController.update);
router.delete('/:id', challengeController.destroy);
router.put('/', challengeController.update);

module.exports = router;

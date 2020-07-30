const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
router.get('/all', feedbackController.index);
router.get('/:id', feedbackController.show);
router.post('/', feedbackController.store);
router.patch('/', feedbackController.store);
router.delete('/:id', feedbackController.destroy);
router.put('/', feedbackController.store);

module.exports = router;

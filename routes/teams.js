const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/all', teamController.index);
router.get('/:id', teamController.show);
router.post('/', teamController.store);
router.patch('/', teamController.update);
router.delete('/:id', teamController.destroy);
router.put('/', teamController.update);

module.exports = router;

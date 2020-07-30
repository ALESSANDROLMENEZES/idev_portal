const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
router.get('/all/:moduleId', classController.index);
router.get('/:id', classController.show);
router.post('/', classController.store);
router.patch('/', classController.update);
router.put('/', classController.update);
router.delete('/:id', classController.destroy);

module.exports = router;

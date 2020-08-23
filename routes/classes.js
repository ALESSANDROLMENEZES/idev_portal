const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { validateModuleId, validateIdParam, validateClasses } = require('../middlewares/validateFilds');
const { adminValidate } = require('../middlewares/auth');


router.get('/index/:moduleId', validateModuleId(), classController.index);

router.get('/:id', validateIdParam(), classController.show);



//Auth here to authenticate next routes
router.use(adminValidate);


router.post('/:moduleId', validateModuleId(), validateClasses(), classController.store);

router.patch('/:id', validateIdParam(), validateClasses(), classController.update);

router.put('/:id', validateIdParam(), validateClasses(), classController.update);

router.delete('/:id', validateIdParam(), classController.destroy);

module.exports = router;

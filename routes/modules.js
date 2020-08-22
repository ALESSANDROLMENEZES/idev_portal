const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const userModuleController = require('../controllers/userModuleController');
const {
    validateIdParam,
    validateNewModule,
    validateAddModuleToUser,
    validateRemoveModuleToUser
} = require('../middlewares/validateFilds');


router.get('/index', moduleController.index);

router.get('/usermodules', userModuleController.index);




//Auth here to authenticate next routes



router.post('/', validateNewModule(), moduleController.store);

router.delete('/:id', validateIdParam(), moduleController.destroy);

router.post('/usermodule', validateAddModuleToUser(), userModuleController.store);

router.delete('/usermodule/:userId/:moduleId', validateRemoveModuleToUser(), userModuleController.destroy);

module.exports = router;

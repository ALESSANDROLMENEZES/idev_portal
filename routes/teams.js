const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const teamUserController = require('../controllers/teamUserController');
const {
    validateIdParam,
    validateNewTeam,
    validateUpdateTeam,
    validateAddMemberOnTeam,
    validateRemoveUserFromTeam
} = require('../middlewares/validateFilds');

router.get('/index', teamController.index);

router.get('/:id', validateIdParam(), teamController.show);

router.post('/', validateNewTeam(), teamController.store);

router.patch('/:id', validateIdParam(), validateUpdateTeam(), teamController.update);

router.delete('/:id', validateIdParam(), teamController.destroy);

router.put('/:id', validateIdParam(), validateUpdateTeam(), teamController.update);

router.post('/teamusers/store', validateAddMemberOnTeam(), teamUserController.store);

router.delete('/teamusers/:teamId/:userId', validateRemoveUserFromTeam(), teamUserController.destroy);

module.exports = router;

var express = require('express');
var router = express.Router();
const teamUserController = require('../controllers/teamUserController');
const teamController = require('../controllers/teamController');
const feedbackController = require('../controllers/feedbackController');
const askForHelpController = require('../controllers/askForHelpController');
const classController = require('../controllers/classController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teste', async (req, res, next) =>{
let result = await  teamUserController.index();
  res.status(200).json(result);
});

router.get('/testes', async (req, res, next) =>{
  let result = await  teamController.index();
    res.status(200).json(result);
});

router.get('/team', async (req, res, next) => {
  let result = await feedbackController.store();
    res.status(200).json(result);
});
  
router.get('/asks', async (req, res, next) => {
  let result = await askForHelpController.index();
    res.status(200).json(result);
});
  
router.get('/class', async (req, res, next) => {
  let result = await classController.index(1);
    res.status(200).json(result);
  });


module.exports = router;

var express = require('express');
var router = express.Router();
const teamUserController = require('../controllers/teamUserController');
const teamController = require('../controllers/teamController');

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

module.exports = router;

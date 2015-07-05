var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
//console.log('DEBUG:'+quiz_controller);

router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d)',			quizController.show);
router.get('/quizes/:quizId(\\d)/answer', 	quizController.answer);

router.get('/author', function (req, res) {
	res.render('author.ejs');
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});


module.exports = router;

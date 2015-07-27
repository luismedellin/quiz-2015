var models = require('../models/models.js');

// Autoload - factoriza el código sin ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function (quiz) {
      if(quiz){
        req.quiz = quiz;
        next() ;
      }else{
        next(new Error('No existe quizId='+ quizId));
      }
    }
    ).catch(function (error) {
      next(error);
    });
};

exports.index = function (req, res) {
  //almacena el parametro a buscar
  var search=req.query.search;
  //si no ingresa ningun parametro de busqueda, listo todos
  //console.log("valor:"+req.query.search);
  if(search===undefined){
    models.Quiz.findAll().then(function (quizes) {
      res.render('quizes/index.ejs', { quizes: quizes, errors: []});
    }).catch(function (error) {
        next(error);
    });
  }
  //si deseo buscar por palabra clave
  else{
      //delimitar el comodin
      search='%'+search+'%';
      search=search.replace(' ','%');
      models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function (quizes) {
        res.render('quizes/index.ejs', { quizes: quizes, errors: []});
      }).catch(function (error) {
          next(error);
      });
  }
};

// GET /quizes/question
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes/answer
exports.answer = function(req, res) {
    var resultado= 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
      resultado='Correcto'
    } 
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};


// GET /quizes/new
exports.new = function (req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz
    {pregunta: 'Pregunta', respuesta: 'Respuesta'}
  );
  res.render('quizes/new', {quiz: quiz, errors: []});
};


// POST /quizes/create
exports.create = function (req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  quiz
  .validate()
  .then(
    function (err) {
      if(err){
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      }else{
        //guarda en DB los campos pregunta y respuesta de quiz
        quiz
        .save( {fields: ['pregunta', 'respuesta'] })
        .then(function () { res.redirect('/quizes');}); 
      }//redirección HTTP (URL relativo) lista de preguntas
    }
  );
};

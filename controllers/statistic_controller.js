var models = require('../models/models.js');

//GET /quizes/statistics
exports.show = function (req, res) {
	var data = {
		nPreguntas: 0, 
		nComentarios: 0, 
		nPromComent: 0, 
		nPregSinComen: 0, 
		nPregConComen: 0
	};

//El número de preguntas
models.sequelize.query('SELECT COUNT(id) AS cantidad FROM Quizzes;').then(function (cantidad) {
	data.nPreguntas=cantidad[0][0].cantidad;
	//El número de comentarios totales
	models.sequelize.query('SELECT COUNT(id) AS cantidad FROM Comments;').then(function (cantidad) {
		data.nComentarios=cantidad[0][0].cantidad;
		//si hay preguntas
		if(data.nPreguntas!==0){
			data.nPromComent=data.nComentarios/data.nPreguntas;
		}
		//El número de preguntas sin comentarios
		models.sequelize.query('SELECT 	COUNT(A.id) AS cantidad FROM Quizzes A LEFT JOIN Comments B ON A.id=B.QuizId WHERE 	B.QuizId IS NULL;').then(function (cantidad) {
			data.nPregSinComen=cantidad[0][0].cantidad;
			//El número de preguntas con comentarios
			data.nPregConComen=data.nPreguntas-data.nPregSinComen;

			res.render('quizes/statistic', {data:data});

		});
	});	
});

};
/*POSTGRESS - SQLITE*/

CREATE TABLE Temas (
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	valor VARCHAR(255), 
	texto VARCHAR(255), 
	createdAt DATETIME NOT NULL, 
	updatedAt DATETIME NOT NULL
)

valor
texto

CREATE TABLE Quizzes (
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	pregunta VARCHAR(255), 
	respuesta VARCHAR(255), 
	tema VARCHAR(255), 
	createdAt DATETIME NOT NULL, 
	updatedAt DATETIME NOT NULL
)


CREATE TABLE Comments (
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	texto VARCHAR(255), 
	publicado TINYINT(1) DEFAULT 0, 
	createdAt DATETIME NOT NULL, 
	updatedAt DATETIME NOT NULL, 
	QuizId INTEGER REFERENCES Quizzes (id) 
	ON DELETE SET NULL ON UPDATE CASCADE
)


/*MYSQL */

CREATE TABLE Temas (
	id INTEGER PRIMARY KEY AUTO_INCREMENT, 
	valor VARCHAR(255), 
	texto VARCHAR(255), 
	createdAt DATETIME NOT NULL, 
	updatedAt DATETIME NOT NULL
);


CREATE TABLE Quizzes (
	id INTEGER PRIMARY KEY AUTO_INCREMENT, 
	pregunta VARCHAR(255), 
	respuesta VARCHAR(255), 
	tema VARCHAR(255), 
	createdAt DATETIME NOT NULL, 
	updatedAt DATETIME NOT NULL
);


CREATE TABLE Comments (
	id INTEGER PRIMARY KEY AUTO_INCREMENT, 
	texto VARCHAR(255), 
	publicado TINYINT(1) DEFAULT 0, 
	createdAt DATETIME NOT NULL, 
	updatedAt DATETIME NOT NULL, 
	QuizId INTEGER REFERENCES Quizzes (id) 
	ON DELETE SET NULL ON UPDATE CASCADE
)




/*datos */ 

INSERT INTO Temas(valor, texto) VALUES ('otro','Otro');
INSERT INTO Temas(valor, texto) VALUES ('humanidades','Humanidades');
INSERT INTO Temas(valor, texto) VALUES ('ocio','Ocio');
INSERT INTO Temas(valor, texto) VALUES ('ciencia','Ciencia');
INSERT INTO Temas(valor, texto) VALUES ('tecnologia','Tecnología');



INSERT INTO Quizzes(pregunta,respuesta,tema) VALUES ('Capital de Italia','Roma','humanidades');
INSERT INTO Quizzes(pregunta,respuesta,tema) VALUES ('Capital de Portugal','Lisboa','otro');
INSERT INTO Quizzes(pregunta,respuesta,tema) VALUES ('Pregunta','Respuesta','otro');




INSERT INTO Comments(texto, publicado, QuizId) VALUES ('hola',1,2);
INSERT INTO Comments(texto, publicado, QuizId) VALUES ('prueba',1,1);





#El número de preguntas
SELECT COUNT(id) n FROM Quizzes;


#El número de comentarios totales
SELECT COUNT(id) FROM Comments;


#El número medio de comentarios por pregunta
SELECT COUNT(id)/(SELECT COUNT(id) FROM Quizzes) FROM Comments;

#El número de preguntas sin comentarios
SELECT 	COUNT(A.id)
FROM 	Quizzes A LEFT JOIN Comments B
ON 		A.id=B.QuizId
WHERE 	B.QuizId IS NULL;



#El número de preguntas con comentarios
SELECT 	count(DISTINCT QuizId)
FROM  	Comments 
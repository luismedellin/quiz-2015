var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz; // exportar definición de tabla Quiz


// Importar la definicion de la tabla Quiz en quiz.js
var Tema = sequelize.import(path.join(__dirname,'tema'));
exports.Tema = Tema; // exportar definición de tabla Tema

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla Quiz
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create({ pregunta: 'Capital de Italia',
      	            respuesta: 'Roma',
                    tema: 'humanidades'
      	         });
      Quiz.create({ pregunta: 'Capital de Portugal',
                    respuesta: 'Lisboa',
                    tema: 'otro'
                 });
    };
  });
  

  // then(..) ejecuta el manejador una vez creada la tabla Tema
  Tema.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Tema.create({ valor: 'otro',
                    texto: 'Otro'
            });
      Tema.create({ valor: 'humanidades',
                          texto: 'Humanidades'
                  });                
      Tema.create({ valor: 'ocio',
                          texto: 'Ocio'
                  });
      Tema.create({ valor: 'ciencia',
                          texto: 'Ciencia'
                  });
      Tema.create({ valor: 'tecnologia',
                          texto: 'Tecnología'
                  })
      .then(function(){console.log('Base de datos inicializada')});
      
    };
  });

});
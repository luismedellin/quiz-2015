// Definicion del modelo de Tema

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tema',
            { valor:  {
            	type: DataTypes.STRING,
            	validate: { notEmpty: {msg: "-> Falta valor"}}
        	  },
              texto: { 
              	type: DataTypes.STRING,
              	validate: { notEmpty: {msg: "-> Falta Texto"}}
              }
            });
}
const Sequelize = require("sequelize");
 
// Conexão com o sequelize
const connection = new Sequelize('guiaperguntas', 'root', 'eurinho123', {
    host: 'localhost',
    dialect: 'mysql',
});

// Exportação da conexão
module.exports = connection;
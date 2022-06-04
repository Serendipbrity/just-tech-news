// import the sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our database
let sequelize;
if (process.env.JAWS_URL) {
    sequelize = new Sequelize(process.env.JAWS_URL);
} else {
    sequelize = new Sequelize(process.env.JAWSDB_NAME, process.env.JAWSDB_USER, process.env.JAWSDB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}
module.exports = sequelize;
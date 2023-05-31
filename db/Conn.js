// Database Config
require("dotenv").config();

var dbname = process.env.DBNAME
var dbuser = process.env.DBUSER
var dbpassword = process.env.DBPASSWORD

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
    port: 3306, 
    dialect: 'mysql',
    host: 'localhost'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log(`Database connection successful!`);
    } catch (error) {
        console.log(`Error connect to database: ${error}`);
    }
})();

module.exports = sequelize;
const Sequelize = require("sequelize");
const db = require("../db/Conn");

const User = db.define('User', {
    id:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:
    {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
});

(async () => {
    await db.sync();
})();

module.exports = User;
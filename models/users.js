const Sequelize = require('sequelize');
module.exports = (sequelize, type) =>{
    return sequelize.define('users',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING(100),
        lastname: Sequelize.STRING(100),
        registro: Sequelize.STRING(20),
        role: Sequelize.STRING(50),
        name_user: Sequelize.STRING(100),
        password: Sequelize.STRING(100)
    })
}
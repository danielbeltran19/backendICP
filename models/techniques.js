const Sequelize = require('sequelize');
module.exports = (sequelize, type) =>{
    return sequelize.define('techiques',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING(100),
        classification: Sequelize.STRING(100)
    })
}
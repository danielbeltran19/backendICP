const Sequelize = require('sequelize');
module.exports = (sequelize, type) =>{
    return sequelize.define('details',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        submision: Sequelize.STRING(40),
        sample: Sequelize.STRING(45)        ,
        fecha:Sequelize.DATE,
        id_tasks: {
            type: Sequelize.INTEGER,
            foreignKey: 'id',
            constraints: false
        },
        id_techniques: {
            type: Sequelize.INTEGER,
            foreignKey: 'id',
            constraints: false
        },

        details: Sequelize.STRING(200)

    })
}
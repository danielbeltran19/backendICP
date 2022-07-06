const Sequelize = require('sequelize');
const UserModel = require('../models/users')
const TasksModel = require('../models/tasks')
const DetailsModel = require('../models/details')
const TechniquesModel = require('../models/techniques')


const sequelize = new Sequelize('bdicp', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false
});

const Users = UserModel(sequelize, Sequelize);
const Tasks = TasksModel(sequelize, Sequelize);
const Details = DetailsModel(sequelize, Sequelize);
const Techniques = TechniquesModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('tablas sincronizadas')
    })

module.exports = {
    Users,
    Tasks,
    Details,
    Techniques,
    sequelize
}
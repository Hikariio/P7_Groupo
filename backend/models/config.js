const Sequelize = require('sequelize');
const sequelize = new Sequelize('Groupomania', 'root', 'Vedette51210', {
    dialect: 'mysql',
    timezone: '+02:00'
})

module.exports = sequelize
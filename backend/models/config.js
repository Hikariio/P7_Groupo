const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('Groupomania', 'root', 'Vedette51210', {
    dialect: 'mysql',
    host: 'localhost'
});

const userModel = require('./user');
const User = userModel(sequelize,DataTypes);

const connect = () => {
    return sequelize.sync({ force: true }) 
    .then(() => {
        console.log("La base de donnée est bien connectée")
    })
}

module.exports = {User,connect}

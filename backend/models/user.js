const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('./config');


const Users = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
  },
  role: {
    type: DataTypes.TEXT,
    defaultValue: 'membre' 
  }
},{timestamps:false});

Users.sync({alter: true});
module.exports = Users;
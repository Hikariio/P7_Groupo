const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('./config');
const Users = require("./user");

const Message = sequelize.define("Messages", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    contenu: {
      type: DataTypes.TEXT
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dislike: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    author: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },
    img_url: {
      type: DataTypes.TEXT
    },
    date_creation: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    }
  },{timestamps:false});
  
  Message.sync({alter: true});
  module.exports = Message;
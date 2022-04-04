const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('./config');
const Message = require("./message");
const User = require('./user');

const Avis = sequelize.define("Avis", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    avis: {
      type: DataTypes.INTEGER,
    },
    author: {
      type: DataTypes.INTEGER,
      references: {
          model: User,
          key: 'id'
      },
      onDelete: 'CASCADE',
    },
    message_principale: {
        type: DataTypes.INTEGER,
        references: {
            model: Message,
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
  },{timestamps:false});
  
  Avis.sync({alter: true});
  module.exports = Avis;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('./config');
const Message = require("./message");
const User = require('./user');

const Commentaire = sequelize.define("Commentaires", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    contenu: {
      type: DataTypes.TEXT,
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
    date_creation: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
  },{timestamps:false});
  
  Commentaire.sync({alter: true});
  module.exports = Commentaire;
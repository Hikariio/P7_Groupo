const express = require('express');
const path = require('path');
const mysql = require('mysql');

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentaireRoutes = require('./routes/commentaire');
const Sequelize= require('sequelize');



// CONNEXION A MYSQL

const app = express();


// Gestion CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json({limit: '50mb'}));


app.use('/images', express.static(path.join(__dirname, 'images')));

console.log(express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/commentaire', commentaireRoutes);

module.exports = app;

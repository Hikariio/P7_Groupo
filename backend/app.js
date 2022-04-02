const express = require('express');
const dotenv = require("dotenv").config();
const app = express();
const db = require('./models/config');
const helmet = require(`helmet`);
const userRoutes = require('./routes/user');
// const messageRoutes = require('./routes/message');
// const commentaireRoutes = require('./routes/commentaire');
db.connect();

// const bodyParser = require(`body-parser`);
// const path = require(`path`);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    next();
})

app.use('/api/', userRoutes);
// app.use('/api/message', messageRoutes);
// app.use('/api/commentaire', commentaireRoutes);

module.exports = app;
const mysql = require('mysql2');
// const dotenv = require("dotenv").config();

// Create the connection 
const db = mysql.createConnection({
  host: `localhost`,
  user: `root`, 
  database: 'groupomania',
  password: `Vedette51210`
});

// host: process.env.DB_HOST,
// user: process.env.DB_USER, 
// database: 'groupomania',
// password: process.env.DB_PASSWORD

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

const user = `create table if not exists user(
    id int primary key auto_increment not null,
    email varchar(50) not null unique,
    password VARCHAR(255) not null,
    lastname VARCHAR(45) not null, 
    firstname VARCHAR(45) not null,
    isAdmin TINYINT(4) not null
  )`;
  
db.execute(user, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
});


module.exports = db;
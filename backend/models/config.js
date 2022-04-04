const Sequelize = require('sequelize');
const sequelize = new Sequelize('Groupomania', 'root', 'Vedette51210', {
    dialect: 'mysql',
    timezone: '+02:00',
    retry: {
        match: [/Deadlock/i],
        max: 3, // Maximum rety 3 times
        backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
        backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
      },
})

module.exports = sequelize
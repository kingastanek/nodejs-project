const Sequelize = require('sequelize');

const sequelize = new Sequelize('new-schema', 'root', 'mysql', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
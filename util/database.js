const Sequelize = require('sequelize');

const sequelize = new Sequelize('new_schema', 'root', 'mysql', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
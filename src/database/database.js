const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../../databases/Application-data.db',
});

module.exports = sequelize;

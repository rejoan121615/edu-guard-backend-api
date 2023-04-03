const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/application.sqlite',
});

module.exports = sequelize;

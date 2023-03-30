const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../../database/local-user.sqlite',
});

module.exports = sequelize;

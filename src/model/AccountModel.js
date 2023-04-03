const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const AccountModel = sequelize.define("account", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    accountType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    passwordUpdate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});


module.exports = AccountModel;

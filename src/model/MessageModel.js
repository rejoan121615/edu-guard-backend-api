const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const AccountModel = require("./AccountModel");

const MessageModel = sequelize.define("message", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    senderId: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    reciverId: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

MessageModel.belongsTo(AccountModel);
AccountModel.hasMany(MessageModel);


module.exports = MessageModel;

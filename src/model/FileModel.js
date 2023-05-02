const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const AccountModel = require("./AccountModel");

const FileModel = sequelize.define("files", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    uploadedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fileUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    allowModify: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

FileModel.belongsTo(AccountModel);
AccountModel.hasMany(FileModel);

module.exports = FileModel;

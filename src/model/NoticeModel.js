const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const AccountModel = require("./AccountModel");

const NoticeModel = sequelize.define("notice", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    files: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    noticeType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

NoticeModel.belongsTo(AccountModel);
AccountModel.hasMany(NoticeModel);

module.exports = NoticeModel;

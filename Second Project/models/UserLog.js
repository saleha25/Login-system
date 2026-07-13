const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserLog = sequelize.define(
    "UserLog",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        action: {
            type: DataTypes.STRING,
            allowNull: false
        },

        loginTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: "user_logs",
        timestamps: true
    }
);

module.exports = UserLog;
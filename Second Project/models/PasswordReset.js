const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PasswordReset = sequelize.define(
    "PasswordReset",
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

        resetToken: {
            type: DataTypes.STRING,
            allowNull: false
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: "password_resets",
        timestamps: true
    }
);

module.exports = PasswordReset;
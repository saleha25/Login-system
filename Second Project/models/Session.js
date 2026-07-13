const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Session = sequelize.define(
    "Session",
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

        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        expiresAt: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: "sessions",
        timestamps: true
    }
);

module.exports = Session;
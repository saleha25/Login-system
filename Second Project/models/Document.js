const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Document = sequelize.define(
    "Document",
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

        fileName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        filePath: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "documents",
        timestamps: true
    }
);

module.exports = Document;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Organization = sequelize.define(
    "Organization",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        organizationName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING
        },

        phone: {
            type: DataTypes.STRING
        },

        address: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "organizations",
        timestamps: true
    }
);

module.exports = Organization;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserOrganization = sequelize.define(
    "UserOrganization",
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

        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "user_organizations",
        timestamps: true
    }
);

module.exports = UserOrganization;
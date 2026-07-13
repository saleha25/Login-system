const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Role = require("./Role");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        gender: {
            type: DataTypes.STRING
        },

        dob: {
            type: DataTypes.DATEONLY
        },

        howDidYouFindUs: {
            type: DataTypes.STRING
        },

        license: {
            type: DataTypes.STRING
        },

        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "roles",
                key: "id"
            }
        }
    },
    {
        tableName: "users",
        timestamps: true
    }
);

module.exports = User;
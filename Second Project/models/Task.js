const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define("Task", {

    id: {

        type: DataTypes.INTEGER,

        autoIncrement: true,

        primaryKey: true

    },

    title: {

        type: DataTypes.STRING,

        allowNull: false

    },

    dueDate: {

        type: DataTypes.DATE,

        allowNull: false

    },

    status: {

        type: DataTypes.STRING,

        defaultValue: "Pending"

    }

});

module.exports = Task;
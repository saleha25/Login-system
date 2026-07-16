const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const JobLog = sequelize.define("JobLog", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    jobName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    executionTime: {
        type: DataTypes.DATE,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    errorMessage: {

    type: DataTypes.TEXT,

    allowNull: true

}

});

module.exports = JobLog;
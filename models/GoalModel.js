
const {DataTypes} = require('sequelize')
const db = require('../db');


const Goal = db.define('goal', {
    goaldescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    goalpriority: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    goalachieved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    climberid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Goal;
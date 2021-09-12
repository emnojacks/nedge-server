
const {DataTypes} = require('sequelize')
const db = require('../db');


const Goal = db.define('goal', {
    goaldescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    goalpriority: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    goalachieved: {
        type: DataTypes.BOOLEAN,
    },
    climberid: {
        type: DataTypes.INTEGER
    },
});

module.exports = Goal;
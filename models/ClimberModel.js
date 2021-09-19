//you pass in db and datatypes bc those are the arguments u said u would in models index.js
//in WOL we define and require them inside the model itself, in Red we defined them in the index.

const { DataTypes } = require('sequelize')
const db = require('../db');


const Climber = db.define("climber", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gymname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    needpartner: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    experiencelevel: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isAdmin: {
     type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
});

module.exports = Climber;

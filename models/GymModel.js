const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db');


const Gym = db.define("gym", {
    gymcode: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gymname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Gym;

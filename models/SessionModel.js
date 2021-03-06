const {DataTypes} = require('sequelize')
const db = require('../db');

    const Session = db.define('session', {
        sessiondate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
          // type: DataTypes.DATEONLY,
        sessionsuccessful: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        sessionlength: {
            type: DataTypes.REAL,
            allowNull: true,
        },
        //one day you could make this string and log the person u climbed with 
        sessionpartner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        //optional but included in req body
        crosstraining: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        nutritioncondition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sleepcondition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stresscondition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        egocondition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //optional but incld in req body
        sessionnotes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        climberid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    });

module.exports = Session;

//diff
// Grab db instance
//removed syncdb func from this import below
//const { db } = require('../db')
//const { DataTypes } = require('sequelize')

//same 
// Grab Model Functions
// const DefineClimber = require('./ClimberModel')
// const DefineGoal = require('./GoalModel')
// const DefineSession = require('./SessionModel')

//are these used to create the next associations
//defining the models and passing in the db and datatypes objects
// const Climber = DefineClimber(db, DataTypes)
// const Goal = DefineGoal(db, DataTypes) 
// const Session = DefineSession(db, DataTypes) 

const Climber = require('./ClimberModel')
const Goal = require('./GoalModel')
const Session = require('./SessionModel')


//new
// Define Associations

// Climber Model Ass'ns
Climber.hasMany(Goal)
//     , {
//     foreignKey: {
//         allowNull: false
//     }
// })

Climber.hasMany(Session)
// {
//     foreignKey: {
//         allowNull: false
//this would require all sessions to belong to a goal and we don't want to impose that constraint on users 
//     }
    // }

// //Goal Model Ass'ns
Goal.belongsTo(Climber)

// //Session model Ass'ns
Session.belongsTo(Climber)

Session.belongsTo(Goal)

// Sync
//syncDb(db, { alter:true })

//same
module.exports = { Climber, Goal, Session }

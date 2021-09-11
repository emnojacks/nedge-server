//diff
// Grab db instance
const { db, syncDb } = require('../db')
const { DataTypes } = require('sequelize')

//same 
// Grab Model Functions
const DefineClimber = require('./ClimberModel')
const DefineGoal = require('./GoalModel')
const DefineSession = require('./SessionModel')

//are these used to create the next associations
//defining the models and passing in the db and datatypes objects
const Climber = DefineClimber(db, DataTypes)
const Goal = DefineGoal(db, DataTypes) 
const Session = DefineSession(db, DataTypes) 

//new
// Define Associations

//Climber Model Ass'ns
Climber.hasMany(Goal)
Climber.hasMany(Session)

//Goal Model Ass'ns
Goal.belongsTo(Climber)
Goal.hasOne(Climber)
Goal.belongsTo(Session)

//Session model Ass'ns
Session.belongsTo(Climber)
Session.hasOne(Climber)
Session.hasMany(Goal)

// Sync
syncDb(db, { alter:true })

//same
module.exports = { Climber, Goal, Session  }
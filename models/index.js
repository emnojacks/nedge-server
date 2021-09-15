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


// Define Associations
//always in pairs 

// Climber Model Ass'ns
//source model = climber
//target model = goal - the foreign key defined in source model (climberId)
//one to many betwn climber and goal
//fk defined in target model
Climber.hasMany(Goal);
Goal.belongsToMany(Climber, { through: "ClimberGoals" });


Climber.hasMany(Session)
// {
//     foreignKey: {
//         allowNull: false
//this would require all sessions to belong to a goal and we don't want to impose that constraint on users 
//     }
    // }
Session.belongsTo(Climber)


//Goal Model Ass'ns
Goal.hasMany(Session)
Session.belongsTo(Goal)
//may not need this last ass'n





// Sync
//syncDb(db, { alter:true })

//same
module.exports = { Climber, Goal, Session }

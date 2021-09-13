//create instance of express
const express = require('express');
//import models
const { Goal, Climber } = require('../models')
//create router 
const router = express.Router();
//importing our unique installs/depencies
let validateJWT = require('../middleware/validateJWT')


//======================================
//GET ALL GOALS FOR ALL CLIMBERS
//======================================

router.get('/', validateJWT, async (req, res) => {
    try {
        const existingGoals = await Goal.findAll();
        res.status(302).json({
            message: "Here are all climber's goals",
            existingGoals,
        });
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
});

//=====================================
//GET ALL GOALS FOR LOGGED IN CLIMBER
//=====================================

router.get('/', validateJWT, async (req, res) => {
    const { climberid } = req.climber;
    try {
        const existingGoals = await Goal.findAll({
            where: {
                climberid: climberid
            }
        });
        res.status(302).json({
            message: "Here are all climber's goals",
            existingGoals,
        });
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
});

//==================
//CREATE NEW GOAL
//==================
router.post('/create', validateJWT, async (req, res) => {
    const { climberid } = req.climber;
    const {
        goaldescription,
        goalpriority,
    } = req.body.goal;
    
    const newGoal = {
        goaldescription,
        goalpriority,
        climberid: climberid
    }
    
    try {
        const createNewGoal = await Goal.create(newGoal);
        res.status(201).json({
            message: "new goal created",
            newGoal
        });
    } catch (err) {
        res.status(501).json({ error: err.message })
    }
});


//==================
//UPDATE GOAL
//==================
router.put('/update/:', validateJWT, async (req, res) => {
    res.send("create goal test");
    
})

//==================
//DELETE GOAL
//==================
router.delete('/delete/:', validateJWT,async (req, res) => {
    res.send("create goal test")
})

module.exports = router; 
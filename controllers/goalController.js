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

router.get('/mine', validateJWT, async (req, res) => {
    const { id } = req.climber;
    try {
        const existingGoals = await Goal.findAll({
            where: {
                climberid: id
            }
        });
        res.status(302).json({
            message: "Here your climbing goals",
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
    const { id } = req.climber;
    
    const {
        goaldescription,
        goalpriority,
    } = req.body.goal;
    
    const newGoal = {
        goaldescription,
        goalpriority,
        climberid: id
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
router.put('/update/:id', validateJWT, async (req, res) => {
    const {
        goaldescription,
        goalpriority,
        goalachieved
    } = req.body.goal;
    
    const updateQuery = {
        where: {
            id: req.params.id,
            climberid: req.climber.id
        },
    };  
    const updatedGoal = {
        goaldescription: goaldescription,
        goalpriority: goalpriority,
        goalachieved: goalachieved,
    };
    try {
        const updateExistingGoal = await Goal.update(updatedGoal, updateQuery);
        res.status(202).json({
            message: "climber goals successfully updated",
            updatedGoal
        });
    } catch (err) {
        res.status(304).json({
            message: "Couldnt update your goals at this time",
            error: err.message
        })
    }
})

//==================
//DELETE GOAL
//==================
router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        const deleteQuery =
            //maybe remove the find one argument bc it's not working
            await Goal.findOne({
                where: {
                    id: req.params.id,
                    climberid: req.climber.id
                },
            });
        if (deleteQuery) {
        await Goal.destroy(deleteQuery);
            res.status(200).json({
            message: "climber goal deleted",
            deleteQuery
        });
        }
    } catch (err) {
        res.status(304).json({
            message: "Couldnt delete goal at this time",
            error: err.message
        });
    }
});

module.exports = router; 
//create instance of express
const express = require('express');
//import model
const { Session } = require('../models');
//create router 
const router = express.Router();
//importing our unique installs/depencies
let validateJWT = require('../middleware/validateJWT')


//==================
//GET ALL SESSIONS 
//==================

router.get('/', validateJWT, async (req, res) => {
    res.send("test get session endpoint");
    console.log("retrieving all sessions");
    try {
        const existingSessions = await Session.findAll();
        res.status(302).json({
            message: "Here are all climber's sessions",
            existingSessions,
        });
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
});

//=====================================
//GET ALL SESSIONS FOR LOGGED IN CLIMBER
//=====================================

router.get('/mine', validateJWT, async (req, res) => {
    const { id } = req.climber;
    try {
        const existingSessions = await Session.findAll({
            where: {
                climberid: id
            }
        });
        res.status(302).json({
            message: "Here your climbing sessions",
            existingSessions,
        });
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
});

//==================
//CREATE NEW SESSION
//==================
router.post('/create', validateJWT, async (req, res) => {
    const { id } = req.climber;
    
    const {
        sessionsuccessful,
        sessionlength,
        sessionpartner,
        crosstraining,
        nutritioncondition,
        sleepcondition,
        stresscondition,
        egocondition,
        sessionnotes
    } = req.body.session;
    
    const newSession = {
        sessionsuccessful:sessionsuccessful,
        sessionlength:sessionlength,
        sessionpartner:sessionpartner,
        crosstraining:crosstraining,
        nutritioncondition: nutritioncondition,
        sleepcondition: sleepcondition,
        stresscondition: stresscondition,
        egocondition:egocondition,
        sessionnotes:sessionnotes,
        climberid: id,
    }
    try {
        const createNewSession = await Session.create(newSession);
        res.status(201).json({
            message: "new session logged",
            newSession
        });
    } catch (err) {
        res.status(501).json({ error: err.message })
    }
});


//==================
//UPDATE SESSION
//==================
router.put('/update/:id', validateJWT, async (req, res) => {
    const {
        sessionsuccessful,
        sessionlength,
        sessionpartner,
        crosstraining,
        nutritioncondition,
        sleepcondition,
        stresscondition,
        egocondition,
        sessionnotes
    } = req.body.session;
    
    const updateQuery = {
        where: {
            id: req.params.id,
            climberid: req.climber.id
        },
    };  
    const updatedSession = {
     sessionsuccessful:sessionsuccessful,
        sessionlength:sessionlength,
        sessionpartner:sessionpartner,
        crosstraining:crosstraining,
        nutritioncondition: nutritioncondition,
        sleepcondition: sleepcondition,
        stresscondition: stresscondition,
        egocondition:egocondition,
        sessionnotes:sessionnotes,
        climberid: id,
    };
    try {
        const updateExistingSession = await Session.update(updatedSession, updateQuery);
        res.status(202).json({
            message: "session successfully updated",
            updatedSession
        });
    } catch (err) {
        res.status(304).json({
            message: "Couldnt update session at this time",
            error: err.message
        })
    }
})

//==================
//DELETE SESSION
//==================
router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        const deleteQuery =
            //maybe remove the find one argument bc it's not working
            await Session.findOne({
                where: {
                    id: req.params.id,
                    climberid: req.climber.id
                },
            });
        if (deleteQuery) {
        await Session.destroy(deleteQuery);
            res.status(200).json({
            message: "climber session deleted",
            deleteQuery
        });
        }
    } catch (err) {
        res.status(304).json({
            message: "Couldnt delete session at this time",
            error: err.message
        });
    }
});

module.exports = router; 
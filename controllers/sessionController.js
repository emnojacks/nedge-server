//create instance of express
const express = require('express');
//import model
const { Session } = require('../models');
//create router 
const router = express.Router();
//importing our unique installs/depencies
let validateJWT = require('../middleware/validateJWT')



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
        sessiondate,
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
        sessiondate: sessiondate,
        sessionsuccessful: sessionsuccessful,
        sessionlength: sessionlength,
        sessionpartner: sessionpartner,
        crosstraining:crosstraining,
        nutritioncondition: nutritioncondition,
        sleepcondition: sleepcondition,
        stresscondition: stresscondition,
        egocondition: egocondition,
        sessionnotes: sessionnotes,
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
    const sessionid = req.params.id;
    const climberid = req.climber.id;
    
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
        // climberid: id,
    };
    
    const updateQuery = {
        where: {
            id: sessionid,
            climberid: climberid,
        },
    };  
    try {
            const executeSessionUpdate = await Session.update(updatedSession, updateQuery);
            res.status(202).json({
                message: "session successfully updated if it existed",
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
    const climberid = req.climber.id;
    const sessionid = req.params.id;
    
    try {
        const existingSession = await Session.findOne({
            where: {
                id: req.params.id,
                climberid: climberid
            }
        })
        if (existingSession) {
        const deleteQuery =
             {
                where: {
                    id: sessionid,
                    climberid: climberid,
                }
         }  
        await Session.destroy(deleteQuery);
            res.status(200).json({
            message: "climber session deleted",
            deleteQuery
        });
        }
        else {
            res.status(404).json({
            message: "that session does not exist"
            })
        }
    } catch (err) {
        res.status(304).json({
            message: "Couldnt delete session at this time",
            error: err.message
        });
    }
});

module.exports = router; 
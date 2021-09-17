 //create instance of express
const express = require('express');
//import model
const { Gym, Climber, Session, Goal } = require('../models')
//create router 
const router = express.Router();
//import err library from sqlize
const { UniqueConstraintError } = require('sequelize/lib/errors');
//importing our unique installs/depencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let validateAdminJWT = require('../middleware/validateAdminJWT');
const { v1: uuidv1 } = require('uuid');

//==================
//GYM ADMIN SIGN UP 
//==================
router.post('/create', async (req, res) => {
    let { password, email, gymname, location } = req.body.gym;
    try {
        const newGym = await Gym.create({
            gymcode: uuidv1(),
            password: bcrypt.hashSync(password, 14),
            email,
            gymname,
            location,
            
        });
        if (newGym) {
            let token = jwt.sign(
                {
                    id: newGym.id,
                    gymcode: newGym.gymcode
                },
                process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 12 });
   
            res.status(201).json({
                message: "Welcome Gym Admin!",
                gym: newGym,
                sessionToken: token
            });
        } else {
            res.status(400).json({
                message: "Couldn't create admin account!",
            })}
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use. Maybe you've signed up before - try logging in.",
            });
        } else {
            res.status(500).json({
                message: "Bummer. Couldn't create gym account",
            });
        }
    }
});

//==================
//GYM ADMIN LOGIN 
//==================

router.post('/login', async (req, res) => {
    let { email, password } = req.body.gym;
    
    try {
        const existingGym = await Gym.findOne({
            where: {
                email: email,
            },
        });
        
        if (existingGym) {

            let passwordCompare = await bcrypt.compare(password, existingGym.password);
            
            if (passwordCompare) {
                let token = jwt.sign({ id: existingGym.id, gymcode: existingGym.gymcode  }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 12 });
                res.status(200).json({
                    gym: existingGym,
                    message: "Rad. You're in!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "RIP. Incorrect email or password."
                })
            }
            } else {
            res.status(401).json({
                message: "RIP. Incorrect email or password."
            });
            }
    } catch (error) {
        res.status(500).json({
            message: "RIP.  We can't get you into the gym"
        })
    }
});


//===================================
//GET ALL CLIMBERS - ADMIN ACCESSS ONLY 
//===================================

router.get('/all_climbers', validateAdminJWT, async (req, res) => {
    try {
        const allClimbers = await Climber.findAll();
        if (allClimbers) {
            res.status(444).json({
                message: "List of climbers",
                allClimbers
            })
        }
    } catch (error) {
        res.status(404).json({
            message: "Can't find any climbers",
            error: error.message
        })
    }
});


//===================================
//GET ALL CLIMBERS AT YOUR GYM- ADMIN ACCESSS ONLY 
//===================================

router.get('/gym_climbers', validateAdminJWT, async (req, res) => {
    const gymname = req.gym.gymname;
    
    try {
        const allClimbers = await Climber.findAll({
            where: {
                gymname: gymname
            },
            include: {
                model: Goal,
            },
        });
        if (allClimbers) {
            res.status(444).json({
                message: "List of nedge climbers at your gym: ",
                allClimbers
            })
        }
    } catch (error) {
        res.status(404).json({
            message: "Can't find any climbers",
            error: error.message
        })
    }
});


//====================================
//GET ALL SESSIONS - ADMIN ACCESS ONLY
//====================================
router.get('/all_sessions', validateAdminJWT, async (req, res) => {
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


//======================================
//GET ALL GOALS FOR ALL CLIMBERS - ADMIN ACCESS ONLY
//======================================

router.get('/all_goals', validateAdminJWT, async (req, res) => {
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


module.exports = router; 
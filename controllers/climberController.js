//create instance of express
const express = require('express');
//import model
const { Climber } = require('../models')
//create router 
const router = express.Router();
//import err library from sqlize
const { UniqueConstraintError } = require('sequelize/lib/errors');
//importing our unique installs/depencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateJWT = require('../middleware/validateJWT')

//==================
//CLIMBER SIGN UP & OPTIONALLY CREATING PROFILE 
//==================

router.post('/create', async (req, res) => {
    //res.send("trying to create climber");
    let { username, password, gymname, location, climbingtype, experiencelevel, needpartner, isAdmin } = req.body.climber;
    console.log('trying to create climber')
    try {
        const newClimber = await Climber.create({
            //the username value is diff than in wol and grocery
            username,
            password: bcrypt.hashSync(password, 14),
            gymname,
            location,
            climbingtype,
            experiencelevel,
            needpartner,
            //added isAdmin in the req body
            isAdmin
        });
      
        let token = jwt.sign(
            {
                id: newClimber.id,
                //added isAdmin in the jwt token
                isAdmin: newClimber.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 12 });
   
        res.status(201).json({
            message: "Dope, you're all signed up",
            climber: newClimber,
            sessionToken: token,
            isAdmin: newClimber.isAdmin
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Be more unique - username already in use. Or maybe you've signed up before - try logging in.",
            });
        } else {
            res.status(500).json({
                message: "Bummer. Couldn't sign climber up",
            });
        }
    }
});

//==================
//CLIMBER LOGIN 
//==================

router.post('/login', async (req, res) => {
    let { username, password } = req.body.climber;
    
    try {
        const existingClimber = await Climber.findOne({
            where: {
                username: username,
            },
        });
        
        if (existingClimber) {

            let passwordCompare = await bcrypt.compare(password, existingClimber.password);
            
            if (passwordCompare) {
                //added second param to token here 
                let token = jwt.sign({ id: existingClimber.id, isAdmin: existingClimber.isAdmin }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 12 });
                res.status(200).json({
                    climber: existingClimber,
                    message: "Rad. You're in!",
                    sessionToken: token,
                    // isAdmin: existingClimber.isAdmin
                    isAdmin: token
                });
            } else {
                res.status(401).json({
                    message: "RIP. Incorrect username or password."
                })
            }
            } else {
            res.status(401).json({
                message: "RIP. Incorrect username or password."
            });
            }
    } catch (error) {
        res.status(500).json({
            message: "RIP.  We can't get you into nedge"
        })
    }
});

//==================
//CLIMBER PROFILE UPDATE 
//==================

router.put('/profile/:id', validateJWT, async (req, res) => {
    const id = req.climber.id;
    
    const {
        username,
        gymname,
        needpartner,
        experiencelevel,
        location,
        climbingtype
        //isAdmin,
    } = req.body.climber;
    
    const updatedProfile = {
        username: username,
        gymname: gymname,
        needpartner: needpartner,
        experiencelevel: experiencelevel,
        climbingtype: climbingtype,
        location: location,
    };
    
    const updateQuery = {
        where: {
            id: id,
        },
    };
    try {
        const executeProfileUpdate = 
        await Climber.update(updatedProfile, updateQuery);
        res.status(202).json({
            message: "climber profile successfully updated",
            updatedProfile
        })
    }
     catch (err) {
        res.status(304).json({
            message: "Couldnt update your profile at this time",
            error: err.message
        })
    }
})


//==================
//CLIMBER PROFILE DISPLAY
//==================

router.get('/profile', validateJWT, async (req, res) => {
    const climberid = req.climber.id;
    try {
        const climberProfile = 
            await Climber.findOne({
                where: {
                    id: climberid
                }
            });
        res.status(201).json(climberProfile)
        console.log(req.climber.isAdmin)
    }
     catch (err) {
        res.status(404).json({
            message: "Couldnt fetch your profile at this time",
            error: err.message
        })
    }
})

module.exports = router; 
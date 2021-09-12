//create instance of express
const express = require('express');
//import model
const { Goal, Climber } = require('../models')
//create router 
const router = express.Router();
//importing our unique installs/depencies
let validateJWT = require('../middleware/validateJWT')



//==================
//GET ALL GOALS
//==================


router.get('/', async (req, res) => {
    res.send("get goal test")
})


//==================
//CREATE NEW GOAL
//==================
router.post('/create', async (req, res) => {
    res.send("create goal test")
})


//==================
//UPDATE GOAL
//==================
router.put('/update', async (req, res) => {
    res.send("create goal test")
})

//==================
//DELETE GOAL
//==================
router.delete('/delete', async (req, res) => {
    res.send("create goal test")
})

module.exports = router; 
require('dotenv').config();
const express = require('express');
//the app is an instance of the express framework 
const app = express();
const dbConnect = require('./db') //not sure if this is needed
// const controllers = require("./controllers");

//headers must be sent before routes are declared 
app.use(require('./middleware/headers'));

//must go above any route statements bc all res must be jsonified 
app.use(express.json());

//setting up base URLS
const climber = require('./controllers/climberController');
app.use('/climber', climber);

// const goal = require('./controllers/goalController');
// app.use('/goal', goal);

// const session = require('./controllers/sessionController');
// app.use('/session', session);

//this is structured as a promise bc sequelize is a promise based lan that communicates with database
dbConnect.authenticate()
    .then(() => dbConnect.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: server crashed. Error: ${err}`);
    });

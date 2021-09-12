require('dotenv').config();
const express = require('express');
//the app is an instance of the express framework 
const app = express();
const dbConnect = require('./db') //not sure if this is needed
const controllers = require('./controllers')

//headers must be sent before routes are declared 
app.use(require('./middleware/headers'));

//must go above any route statements bc all res must be jsonified 
app.use(express.json());

//setting up base URLS
app.use('/climber', controllers.climberController);
//app.use('/goal', controllers.goalController);
//app.use('/session', controllers.sessionController);

//authenticate then sync all tables/models in database
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

const Sequelize  = require('sequelize');
//imports sequlize pckg and creates instance of sql as an obj (calling it db) below
//passing in all the params separately that are needed to connect and stored in secret file
const db = new Sequelize(
    // process.env.DB_DBNAME,
    // process.env.DB_USER,
    // process.env.DB_PASS,
    process.env.DATABASE_URL,
    {
        // host: process.env.DB_HOST,
        dialect: 'postgres'
        //may need to add "ssl: process.env.ENVIRONMENT === 'production" during heroku deployment
        ,
        dialectOptions: {
            require: true,
            rejectUnauthorized: false
        }
    }
)

//syncs all models in the db with the current changes to tables at once
// this is add'ln from blue badge WOL and listo 
//it's defined here in db but not called until model index.js runs

// async function syncDb(db, options){
//     const { force, alter} = options
//     try {
//         if (force)
//             await db.sync({force: true})
//         else if (alter)
//             await db.sync({alter: true})
//         else
//             await db.sync()
//     } catch (err){
//         console.log(err)
//     }
// }

module.exports = db;


// module.exports = (db, DataTypes) => {
//     const Session = db.define('session', {
//         sessionsuccessful: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//         },
//         sessionlength: {
//             type: DataTypes.NUMBER,
//             allowNull: false,
//         },
//         //one day you could make this string and log the person u climbed with 
//         sessionpartner: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//         },
//         //optional but included in req body
//         crosstraining: {
//             type: DataTypes.BOOLEAN,
//             allowNull: true,
//         },
//         nutritioncondition: {
//             type: DataTypes.NUMBER,
//             allowNull: false,
//         },
//         sleepcondition: {
//             type: DataTypes.NUMBER,
//             allowNull: false,
//         },
//         stresscondition: {
//             type: DataTypes.NUMBER,
//             allowNull: false,
//         },
//         egocondition: {
//             type: DataTypes.NUMBER,
//             allowNull: false,
//         },
//         climberid: {
//             type: DataTypes.INTEGER
//         },
//         //optional but incld in req body
//         sessionnotes: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         }
//     })
//     return Session;
// }
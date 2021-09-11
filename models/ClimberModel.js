//you pass in db and datatypes bc those are the arguments u said u would in models index.js
//in WOL we define and require them inside the model itself, in Red we defined them in the index.

module.exports = (db, DataTypes) => {
    const Climber = db.define('climber', {
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        homegym: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        needpartner: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
         },
        experiencelevel: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        experiencelevel: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    })
    return Climber;
}
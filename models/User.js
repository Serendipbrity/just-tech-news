// import model and data types from sequelize
const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model, use extends keyword so User inherits all functionality of Model class
class User extends Model {}

// define table columns and configuration
// use init() method to initialize the models data and configuration passing in two objects
User.init(
    // the first object defines the columns and data types for the columns
    {
        // define an id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of SQLs NOT NULL option
            allowNull: false,
            //instruct that this is the Primary Key
            primaryKey: true,
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    // the second object configs certain options for the table
    {
        // pass in our imported sequelize connection (the direct connection to our database) sequelize
        sequelize,
        // dont automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);
// export newly created model so we can use it in other parts of the app
module.exports = User;


// import model and data types from sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// for encrypting passwords
const bcrypt = require('bcrypt');

// create our User model, use extends keyword so User inherits all functionality of Model class
class User extends Model {
    //set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
            autoIncrement: true,
            defaultValue: true
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
            unique: true,
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
    {
        hooks: {
    //set up beforeCreate lifecycle "hook" functonality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
           // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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


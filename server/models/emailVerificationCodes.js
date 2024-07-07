const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); // Assuming your sequelize instance is exported from models/index.js
const User = require('./users');

const emailVerificationCodes = sequelize.define('emailVerificationCodes', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'email', 
        }
    },
    temporaryCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiry: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});


module.exports = emailVerificationCodes;
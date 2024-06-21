const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Rooms = sequelize.define('Rooms', {
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
});

module.exports = Rooms;
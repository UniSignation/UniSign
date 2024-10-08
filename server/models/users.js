const { DataTypes } = require("sequelize");
const { sequelize } = require("./db"); // Assuming your sequelize instance is exported from models/index.js
const bcrypt = require("bcrypt");
const saltRounds = 2;

const Users = sequelize.define("Users", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  usesService: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  // Set default value to false
    allowNull: false,
  },
});

Users.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

Users.beforeUpdate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

module.exports = Users;

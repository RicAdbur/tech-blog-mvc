const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class User extends Model {
  async checkPassword(plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password)
  }
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    }
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async function(userData) {
        userData.password = await bcrypt.hash(userData.password, saltRounds)
      },
      beforeUpdate: async function(userData) {
        userData.password = await bcrypt.hash(userData.password, saltRounds)
      },
    }
  }
);

module.exports = User;
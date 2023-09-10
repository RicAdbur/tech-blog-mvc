const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {};

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      }
    },
    blogPostID: {
      type: DataTypes.INTEGER,
       references: {
        model: "BlogPosts",
        key: "id",
       }
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
)

module.exports = Comment;
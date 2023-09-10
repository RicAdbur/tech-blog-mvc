const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

User.hasMany(BlogPost, {
  foreignKey: "userID",
});

User.hasMany(Comment, {
  foreignKey: "userID",
});

BlogPost.belongsTo(User, {
  foreignKey: "userID",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blogPostID",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blogPostID",
});

Comment.belongsTo(User, {
  foreignKey: "userID",
});

module.exports = { User, BlogPost, Comment };
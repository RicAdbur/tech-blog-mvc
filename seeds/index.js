require("dotenv").config();
const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models");

const userData = require("./user-seeds.json");
const blogPostData = require("./blogPost-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true })

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
    raw: true,
  })

  await BlogPost.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
    raw: true,
  })

  process.exit(0)
};

seedDatabase()
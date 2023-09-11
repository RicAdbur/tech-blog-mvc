const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
const { isAuthenticated } = require("../utils/helpers")

// home
router.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: User,
      raw: true 
    })
    // console.log(blogPosts)
    res.render("home", {
      blogPosts,
      user: req.session.user,
    })
    // console.log(req.session)
  } catch(err) {
    res.status(500).json(err)
    console.error(err)
  }
})

//signup
router.get("/signup", async (req, res) => {
  try{
    res.render("signup", {
      user: req.session.user,
    })
  } catch(err) {
    res.status(500).json(err)
    console.error(err)
  }
})

//login
router.get("/login", async (req, res) => {
  try{
    res.render("login", {
      user: req.session.user,
    })
  } catch(err) {
    res.status(500).json(err)
    console.error(err)
  }
})

// dashboard
router.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      where: {
        userID: req.session.user.id
      },
      include: User,
      raw: true
    })
    res.render("dashboard", {
      blogPosts,
      user: req.session.user,
    })
  } catch(err) {
    res.status(500).json(err)
    console.error(err)
  }
})

module.exports = router;
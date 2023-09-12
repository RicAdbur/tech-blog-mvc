const router = require("express").Router();
const { BlogPost } = require("../../models");
const { isAuthenticated } = require("../../utils/helpers")

// matches /api/blogPosts/create
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    await BlogPost.create({...req.body, userID: req.session.user.id })
    res.status(200).send()
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

// matches /api/blogPosts/delete/:id
router.delete("/delete/:id", isAuthenticated, async (req, res) => {
  const postID = req.params.id
  try {
    await BlogPost.destroy({
      where: {
        id: postID
      }
    })
    res.status(200).send()
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
})






module.exports = router;
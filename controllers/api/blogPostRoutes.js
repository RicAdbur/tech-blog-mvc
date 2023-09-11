const router = require("express").Router();
const { BlogPost } = require("../../models");
const { isAuthenticated } = require("../../utils/helpers")

router.delete("/delete/:id", isAuthenticated, async (req, res) => {
  const postID = req.params.id

  await BlogPost.destroy({
    where: {
      id: postID
    }
  })
  res.status(200).send()
})







module.exports = router;
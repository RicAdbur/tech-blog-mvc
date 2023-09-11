const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send("Username and password required")
  }

  const user = await User.findOne({
    where: {
      username,
    }
  })

  if (!user) {
    return res.status(401).send("Not authenticated")
  }

  const isCorrectPassword = await user.checkPassword(password)

  if (!isCorrectPassword) {
    return res.status(401).send("Not authenticated")
  }

  req.session.user = user.dataValues

  res.status(202).send("You are logged in")
})

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/")
  })
})

module.exports = router;
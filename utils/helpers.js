const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login")
  }
  next()
}

module.exports = {
  toUpperCase: (string) => string.toUpperCase(),
  isAuthenticated
}



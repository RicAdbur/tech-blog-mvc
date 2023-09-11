require("dotenv").config();
require("./models");
const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers")
const sequelize = require("./config/connection")
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session({
  secret: 'keyboard cat',
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: true,
}))

app.engine("handlebars", engine({ helpers }));
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
});
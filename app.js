const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const config = require("./src/db/config.json");

const adminRoutes = require("./src/routes/adminRoutes");
const publicRoutes = require("./src/routes/publicRoutes");
//init Table and insert data for reset DB
const initializeTables = require("./src/models/createTableFunction");
const authRoutes = require("./src/routes/auth");

const app = express();
const auth = require("./middleware/is-auth");
app
  //ajout middleware favicon
  .use(favicon(__dirname + "/favicon.ico"))
  //middleware pour ameliorer la lisibilité des reponses des requetes
  .use(morgan("dev"))
  //parse body en JSON
  .use(bodyParser.json())
  //routes

  .use(authRoutes)
  .use("/admin", auth, adminRoutes)
  .use(publicRoutes);

//mise en place des tables SQL
initializeTables();

app.listen(config.port, () =>
  console.log(`node started to port ${config.port}`)
);

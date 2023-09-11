const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const config = require("./src/db/config.json");
const db = require("./src/db/db_config");

const adminRoutes = require("./src/routes/admin");
const appRoutes = require("./src/routes/appRoutes");
//init Table and insert data for reset DB
const initializeTables = require("./src/models/createTableFunction");
=======
const isAuth = require("./middleware/is-auth");


const app = express();

app
  //ajout middleware favicon
  .use(favicon(__dirname + "/favicon.ico"))
  //middleware pour ameliorer la lisibilité des reponses des requetes
  .use(morgan("dev"))
  //parse body en JSON
  .use(bodyParser.json())
  .use("/admin", adminRoutes)
  .use(appRoutes);

//mise en place des tables SQL

initializeTables();

require("./src/controllers/auth.js")(app, db);

app.listen(config.port, () =>
  console.log(`node started to port ${config.port}`)
);

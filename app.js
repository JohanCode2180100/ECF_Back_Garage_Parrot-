const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const config = require("./src/db/config.json");
const db = require("./src/db/db_config");
const adminRoutes = require("./src/routes/admin");
const appRoutes = require("./src/routes/appRoutes");
//import create table
const {
  createImageTableIfNotExists,
  createReviewTableIfNotExists,
  createCarContactFormTableIfNotExists,
  createContactFormTableIfNotExists,
  createSecondHandCarTableIfNotExists,
} = require("./src/models/table");

//import create table and insert data
const { createAdminTableIfNotExists } = require("./src/models/User");
const {
  createOpening_hoursTableIfNotExists,
} = require("./src/models/Opening_hours_table");
const {
  createHomePageTableIfNotExists,
} = require("./src/models/homePage_table");
const { createSectionTableIfNotExists } = require("./src/models/section_table");

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

createAdminTableIfNotExists();
createReviewTableIfNotExists();
createSecondHandCarTableIfNotExists();
createCarContactFormTableIfNotExists();
createHomePageTableIfNotExists();
createSectionTableIfNotExists();
createImageTableIfNotExists();
createContactFormTableIfNotExists();
createOpening_hoursTableIfNotExists();

require("./src/controllers/auth.js")(app, db);


app.listen(config.port, () =>
  console.log(`node started to port ${config.port}`)
);

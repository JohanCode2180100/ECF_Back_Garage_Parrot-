const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const config = require("./src/db/config.json");
const db = require("./src/db/db_config");

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
  .use(bodyParser.json());

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

/*----------------------------------------------------------------------------
--------------------- CRUD OPERATION SECOND HAND CAR--------------------------
-----------------------------------------------------------------------------*/
require("./src/routes/Second-hand-car-routes/createCar.js")(app, db);
require("./src/routes/Second-hand-car-routes/getAllCars.js")(app, db);
require("./src/routes/Second-hand-car-routes/getCarByID.js")(app, db);
require("./src/routes/Second-hand-car-routes/deleteCar.js")(app, db);
require("./src/routes/Second-hand-car-routes/updateCar.js")(app, db);
/* ---------------------------------------------------------------------------
-------------------------CRUD OPERATION HOURS REQUEST-------------------------
------------------------------------------------------------------------------ */

require("./src/routes/Hours-routes/getHours.js")(app, db);
require("./src/routes/Hours-routes/updateHours.js")(app, db);

/* ---------------------------------------------------------------------------
--------------------------CRUD OPERATION REVIEW REQUEST-----------------------
------------------------------------------------------------------------------ */
require("./src/routes/Review-routes/getAllReview.js")(app, db);
require("./src/routes/Review-routes/createReview.js")(app, db);
require("./src/routes/Review-routes/getValidedReviews.js")(app, db);
require("./src/routes/Review-routes/getPendingReviews.js")(app, db);
require("./src/routes/Review-routes/approvedPendingReview.js")(app, db);
require("./src/routes/Review-routes/deletedReview.js")(app, db);

/* ---------------------------------------------------------------------------
--------------------------CRUD OPERATION CONTACT REQUEST----------------------
------------------------------------------------------------------------------ */

require("./src/routes/contact-routes/createContact.js")(app, db);
require("./src/routes/contact-routes/getAllContact.js")(app, db);
require("./src/routes/contact-routes/deleteContact.js")(app, db);

/* ---------------------------------------------------------------------------
---------------------------CRUD OPERATION HOME PAGE REQUEST-------------------
------------------------------------------------------------------------------ */

require("./src/routes/HomePage-routes/getAllContaintHome.js")(app, db);
require("./src/routes/HomePage-routes/updatedContaintHomePageByID.js")(app, db);

/* ---------------------------------------------------------------------------
-----------------------------------SECTION PAGE REQUEST------------------------------
------------------------------------------------------------------------------ */
require("./src/routes/section-routes/getAllSections.js")(app, db);
require("./src/routes/section-routes/updateSection.js")(app, db);

app.listen(config.port, () =>
  console.log(`node started to port ${config.port}`)
);

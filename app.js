const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const config = require("./src/db/config.json");
const db = require("./src/db/db_config");

//import create table
const {
  createAdminTableIfNotExists,
  createHomePageTableIfNotExists,
  createSectionTableIfNotExists,
  createImageTableIfNotExists,
  createOpening_hoursTableIfNotExists,
  createReviewTableIfNotExists,
  createCarContactFormTableIfNotExists,
  createContactFormTableIfNotExists,
  createSecondHandCarTableIfNotExists,
} = require("./src/models/table");
let review = require("./review");
let contact = require("./contact-mock");
let homePage = require("./home-page");
let section = require("./section");
//importation de la methode success de maniere destructuré sans appeler le module complet
const { success, getUniqueId } = require("./src/db/helper");

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
createHomePageTableIfNotExists();
createSectionTableIfNotExists();
createImageTableIfNotExists();
createOpening_hoursTableIfNotExists();
createReviewTableIfNotExists();
createSecondHandCarTableIfNotExists();
createContactFormTableIfNotExists();
createCarContactFormTableIfNotExists();

/*----------------------------------------------------------------------------
------------------------------- CRUD OPERATION SECOND HAND CAR----------------
-----------------------------------------------------------------------------*/
require("./src/routes/Second-hand-car-routes/createCar.js")(app, db);
require("./src/routes/Second-hand-car-routes/getAllCars.js")(app, db);
require("./src/routes/Second-hand-car-routes/getCarByID.js")(app, db);
require("./src/routes/Second-hand-car-routes/deleteCar.js")(app, db);
require("./src/routes/Second-hand-car-routes/updateCar.js")(app, db);
/* ---------------------------------------------------------------------------
-----------------------------------CRUD OPERATION HOURS REQUEST---------------
------------------------------------------------------------------------------ */

require("./src/routes/Hours-routes/getHours.js")(app, db);
require("./src/routes/Hours-routes/updateHours.js")(app, db);

/* ---------------------------------------------------------------------------
-----------------------------------CRUD OPERATION REVIEW REQUEST--------------
------------------------------------------------------------------------------ */
require("./src/routes/Review-routes/getAllReview.js")(app, db);
require("./src/routes/Review-routes/createReview.js")(app, db);
require("./src/routes/Review-routes/getValidedReviews.js")(app, db);
require("./src/routes/Review-routes/getPendingReviews.js")(app, db);
require("./src/routes/Review-routes/approvedPendingReview.js")(app, db);
require("./src/routes/Review-routes/deletedReview.js")(app, db);

/* ---------------------------------------------------------------------------
-----------------------------------CONTACT REQUEST------------------------------
------------------------------------------------------------------------------ */

require("./src/routes/contact-routes/createContact.js")(app, db);
require("./src/routes/contact-routes/getAllContact.js")(app, db);
require("./src/routes/contact-routes/deleteContact.js")(app, db);

/* ---------------------------------------------------------------------------
-----------------------------------HOME PAGE REQUEST------------------------------
------------------------------------------------------------------------------ */
app.get("/api/home_page", (req, res) => {
  const message = "Les titres de la page d'accueil ont été récupérés";
  res.json(success(message, homePage));
});

app.put("/api/home_page/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const HomeTitleUpdated = { ...req.body, id: id };
  homePage = homePage.map((title) => {
    return title.id === id ? HomeTitleUpdated : title;
  });
  const message = `Le titre de la page d'accueil n° ${HomeTitleUpdated} à bien été modifié`;
  res.json(success(message, HomeTitleUpdated));
});

/* ---------------------------------------------------------------------------
-----------------------------------SECTION PAGE REQUEST------------------------------
------------------------------------------------------------------------------ */

app.get("/api/section", (req, res) => {
  const message = "Les sections ont été récupérées";
  res.json(success(message, section));
});

app.put("/api/section/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sectionHomeUpdated = { ...req.body, id: id };
  section = section.map((contain) => {
    return contain.id === id ? sectionHomeUpdated : contain;
  });
  const message = `Le contenu de la section n° ${sectionHomeUpdated.id} à bien été modifié`;
  res.json(success(message, sectionHomeUpdated));
});

app.listen(config.port, () =>
  console.log(`node started to port ${config.port}`)
);

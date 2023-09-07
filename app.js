const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const config = require("./src/db/config.json");
const db = require("./src/db/db_config");
const cors = require('cors')

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
let cars = require("./mock-cars");
let weekHours = require("./mock-hours");
let review = require("./review");
let contact = require("./contact-mock");
let homePage = require("./home-page");
let section = require("./section");
//importation de la methode success de maniere destructuré sans appeler le module complet
const { success, getUniqueId } = require("./src/db/helper");

const app = express();

app
  //ajout middlewares
  //ajout middleware favicon
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(cors())

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
require("./src/routes/second-hand-car.routes/createCar.js")(app, db);
require("./src/routes/second-hand-car.routes/getAllCars.js")(app, db);
require("./src/routes/second-hand-car.routes/getCarByID.js")(app, db);
require("./src/routes/second-hand-car.routes/deleteCar.js")(app, db);
require("./src/routes/second-hand-car.routes/updateCar.js")(app, db);
/* ---------------------------------------------------------------------------
-----------------------------------HOURS REQUEST------------------------------
------------------------------------------------------------------------------ */

app.get("/api/hours", (req, res) => {
  const message = "Les horaires ont été récupérés";
  res.json(success(message, weekHours));
});

app.put("/api/hours/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const weekHoursUpdated = { ...req.body, id: id };
  weekHours = weekHours.map((hours) => {
    return hours.id === id ? weekHoursUpdated : hours;
  });
  const message = `Les horaires ont été modifiés`;
  res.json(success(message, weekHoursUpdated));
});

/* ---------------------------------------------------------------------------
-----------------------------------REVIEW REQUEST------------------------------
------------------------------------------------------------------------------ */

app.get("/api/review/valid", (req, res) => {
  const reviewValidated = review.filter((review) => review.status === 2);
  const message = "les avis ont été récupérés";
  res.json(success(message, reviewValidated));
});
/* ---------------------------------------------------------------------------
-----------------------------------REVIEW PENDING------------------------------
------------------------------------------------------------------------------ */
app.get("/api/review/pending", (req, res) => {
  const reviewpending = review.filter((review) => review.status === 1);
  const message = "les avis en attente ont été récupérés";
  res.json(success(message, reviewpending));
});

/* ---------------------------------------------------------------------------
-----------------------------------REVIEW APPROUVED------------------------------
------------------------------------------------------------------------------ */

app.put("/api/review/approve/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const approvedReview = review.find((item) => item.id === id);

  if (!approvedReview) {
    res.status(404).json(error("Avis non trouvé"));
    return;
  }
  if (approvedReview.status === 1) {
    approvedReview.status = 2; // Change le statut de "en attente" à "validé".
    const message = `L'avis n°${approvedReview.id} a été approuvé avec succès`;
    res.json(success(message, approvedReview));
  } else {
    res.status(400).json("Impossible d'approuver un avis déjà validé");
  }
});

app.post("/api/review", (req, res) => {
  const id = getUniqueId(review);
  const reviewCreated = {
    ...req.body,
    ...{ id: id, status: 1, created: new Date() },
  };
  review.push(reviewCreated);
  const message = `l'avis numéro ${reviewCreated.id} a bien été enregistré`;
  res.json(success(message, reviewCreated));
});

app.delete("/api/review/pending/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const reviewDeleted = review.find((message) => message.id === id);
  review = review.filter((message) => message.id !== id);
  const message = `l'avis n° ${reviewDeleted.id} a bien été supprimé`;
  res.json(success(message, reviewDeleted));
});

/* ---------------------------------------------------------------------------
-----------------------------------CONTACT REQUEST------------------------------
------------------------------------------------------------------------------ */
app.get("/api/contact", (req, res) => {
  const message = "la liste des formulaires a été récupérée";
  res.json(success(message, contact));
});

app.post("/api/contact", (req, res) => {
  const id = getUniqueId(contact);
  const contactCreated = { ...req.body, ...{ id: id, created: new Date() } };
  contact.push(contactCreated);
  const message = `Le formulaire n° ${contactCreated.id} a bien été créé`;
  res.json(success(message, contactCreated));
});

app.delete("/api/contact/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contactDelete = contact.find((form) => form.id === id);
  contact = contact.filter((form) => form.id !== id);
  const message = `le formulaire de contact n° ${contactDelete.id} a bien été supprimé`;
  res.json(success(message, contactDelete));
});

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

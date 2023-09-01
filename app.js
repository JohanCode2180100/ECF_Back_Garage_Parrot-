const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
let cars = require("./mock-cars");
let weekHours = require("./mock-hours");
let review = require("./review");
let contact = require("./contact-mock");
//importation de la methode success de maniere destructuré sans appeler le module complet
const { success, getUniqueId } = require("./helper");
const port = 3000;

const app = express();

//ajout middlewares
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

//ajout middleware favicon

app.get("/", (req, res) => {
  res.send("Bonjour");
});

/* ---------------------------------------------------------------------------
----------------------------SECOND-HAND-CAR REQUEST---------------------------
------------------------------------------------------------------------------ */

//get second-hand-cars (GET ALL AND GET byID)

app.get("/api/second-hand-car", (req, res) => {
  const message = "La liste des voitures a bien été récupérée";
  res.json(success(message, cars));
});

//find permet de parcourir les éléments de l'array et de trouver le premier correspondant
app.get("/api/second-hand-car/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //ajout de la new car
  const car = cars.find((car) => car.id === id);

  const message = "la voiture a bien été trouvée";
  res.json(success(message, car));
});

//POST CAR
app.post("/api/second-hand-car", (req, res) => {
  const id = getUniqueId(cars);
  //utilisation du spread operator pour fusionner les propriétés avec la nouvelle
  const carCreated = { ...req.body, ...{ id: id, created: new Date() } };
  cars.push(carCreated);
  const message = `Le véhicule ${carCreated.brand} a bien été enregistrée`;
  res.json(success(message, carCreated));
});

//UPDATE CAR by ID
app.put("/api/second-hand-car/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const carUpdated = { ...req.body, id: id };
  cars = cars.map((car) => {
    return car.id === id ? carUpdated : car;
  });
  const message = `la voiture ${carUpdated.name} a bien été modifiée.`;
  res.json(success(message, carUpdated));
});

//DELETE CAR by ID
app.delete("/api/second-hand-car/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const carDeleted = cars.find((car) => car.id === id);
  cars = cars.filter((car) => car.id !== id);
  const message = `la voiture ${carDeleted.name} a bien été supprimée`;
  res.json(success(message, carDeleted));
});

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

app.get("/api/review", (req, res) => {
  const message = "les avis ont été récupérés";
  res.json(success(message, review));
});

app.post("/api/review", (req, res) => {
  const id = getUniqueId(review);
  const reviewCreated = { ...req.body, ...{ id: id, created: new Date() } };
  review.push(reviewCreated);
  const message = `l'avis numéro ${reviewCreated.id} a bien été enregistré`;
  res.json(success(message, reviewCreated));
});
app.delete("/api/review/:id", (req, res) => {
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

app.listen(port, () => console.log(`node started to port ${port}`));

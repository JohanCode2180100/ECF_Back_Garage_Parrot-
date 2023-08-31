const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
let cars = require("./mock-cars");
//importation de la methode success de maniere destructuré sans appeler le module complet
const { success, getUniqueId } = require("./helper");
const port = 3000;

const app = express();

//ajout middleware morgan pour une meilleure lisibilité des points de terminaisons
app.use(favicon(__dirname + "/favicon.ico")).use(morgan("dev"));

//ajout middleware favicon

app.get("/", (req, res) => {
  res.send("Bonjour");
});

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

app.post("api/second-hand-car", (req, res) => {
  const id = getUniqueId(cars);
  //utilisation du spread operator pour fusionner les propriétés avec la nouvelle
  const carCreated = { ...req.body, ...{ id: id, created: new Date() } };
  cars.push(carCreated);
  const message = `${carCreated.name} a bien été enregistrée`;
  res.json(success(message, carCreated));
});

app.listen(port, () => console.log(`node is started to port ${port}`));

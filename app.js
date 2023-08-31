const express = require("express");
const morgan = require("morgan");
const cars = require("./mock-cars");

const port = 3000;

const app = express();
//utilisation du middleware request logger morgan
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Bonjour");
});

//get second-hand-cars (GET ALL AND GET byID)

app.get("/api/second-hand-car", (req, res) => {
  res.json(cars);
});

//find permet de parcourir les éléments de l'array et de trouver le premier correspondant
app.get("/api/second-hand-car/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find((car) => car.id === id);
  res.json(car);
});

app.listen(port, () => console.log(`node is started to port ${port}`));

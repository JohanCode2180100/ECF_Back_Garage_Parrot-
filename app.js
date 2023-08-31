const express = require("express");
const morgan = require("morgan");

const port = 3000;

const app = express();
//utilisation du middleware request logger morgan
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Bonjour");
});

//get second-hand-cars (GET ALL AND GET byID)
app.get("/api/second-hand-car", (req, res) => {
  res.send("all cars");
});

app.get("/api/second-hand-car/:id", (req, res) => {
  res.send(req.params);
});

app.listen(port, () => console.log(`node is started to port ${port}`));

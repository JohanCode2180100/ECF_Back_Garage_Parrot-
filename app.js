const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const config = require("./src/db/config.json");
const adminRoutes = require("./src/routes/adminRoutes");
const publicRoutes = require("./src/routes/publicRoutes");
//init Table and insert data for reset DB
const authRoutes = require("./src/routes/auth");

const port = process.env.PORT || 3000;

const app = express();

app

  //ajout middleware favicon
  .use(favicon(__dirname + "/favicon.ico"))
  //parse body en JSON
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  })

  //routes
  .use(authRoutes)
  .use(publicRoutes)
  .use("/admin", adminRoutes);

app.listen(config.port, () => console.log(`node started to port ${port}`));

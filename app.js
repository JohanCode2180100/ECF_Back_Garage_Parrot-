const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const adminRoutes = require("./src/controllers/adminRoutes");
const publicRoutes = require("./src/controllers/publicRoutes");
const authRoutes = require("./src/controllers/auth");
const { csrfSync } = require("csrf-sync");
const path = require("path");
const session = require("express-session");
const port = process.env.PORT || 3000;
const app = express();

app.use(
  session({
    // Don't do this, use a cryptographically random generated string
    secret: "test",
  })
);

const {
  generateToken, //générer un jeton
  getTokenFromRequest, // récupérer le jeton soumis par l'utilisateur
  getTokenFromState, // Jeton dans l'etat
  storeTokenInState, // La méthode par défaut pour stocker un jeton dans l'état.
  revokeToken, // Révoque/supprime un jeton en appelant storeTokenInState(undefined)
  csrfSynchronisedProtection, // Il s'agit du middleware de protection CSRF par défaut.
} = csrfSync();

app
  .use(express.json())

  .use(favicon(__dirname + "/favicon.ico"))
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
  .use("/images", express.static(path.join(__dirname, "images")))

  .get("/csrfToken", (req, res) => {
    res.json({ jeton: generateToken(req) });
  })

  .get("/csrfToken", (req, res) => {
    res.json({ jeton: generateToken(req) });
  })
  .post("/secret-stuff", csrfSynchronisedProtection, (req, res) => {
    const { csrfSynchronisedProtection } = csrfSync({
      getTokenFromRequest: (req) => {
        return req.body["CSRFToken"];
      }, // Used to retrieve the token submitted by the user in a form
    });
  })

  .use(csrfSynchronisedProtection)

  .use(authRoutes)
  .use(publicRoutes)
  .use("/admin", adminRoutes);

app.listen(port, () => console.log(`node started to port ${port}`));

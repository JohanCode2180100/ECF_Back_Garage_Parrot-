const mysql = require("mysql2");

let dbConfig;

if (process.env.NODE_ENV === "production") {
  // Configuration pour l'environnement de production (Heroku)
  dbConfig = {
    host: process.env.host,
    port: process.env.port,
    database: process.env.db,
  };
} else {
  // Configuration pour l'environnement local
  dbConfig = {
    host: "localhost",
    port: 3306,
    database: "votre_base_de_donnees_locale",
    user: "votre_utilisateur_local",
    password: "votre_mot_de_passe_local",
  };
}

const db = mysql.createConnection(dbConfig);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;

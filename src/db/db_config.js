const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

db.end(function (err) {
  if (err) {
    console.error("Erreur lors de la fermeture de la connexion :", err);
  } else {
    console.log("Connexion à la base de données fermée");
  }
});

module.exports = db;

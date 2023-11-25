const postgres = require("postgres");

const db = postgres(process.env.DATABASE_URL);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données !");
});

module.exports = db;

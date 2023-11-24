const mysql = require("mysql2");

const databaseURL = process.env.dbconnect;
const db = mysql.createConnection(databaseURL);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;

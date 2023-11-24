const mysql = require("mysql2");

const db = mysql.createConnection(process.env.dbconnect);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;

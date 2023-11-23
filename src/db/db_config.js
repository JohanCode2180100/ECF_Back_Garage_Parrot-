const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.host,
  Port: process.env.Port,
  Database: process.env.Database,
  Username: process.env.Username,
  Password: process.env.Password,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;

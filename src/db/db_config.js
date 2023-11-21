const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  database: process.env.db,
  user: process.env.username,
  password: process.env.password,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;

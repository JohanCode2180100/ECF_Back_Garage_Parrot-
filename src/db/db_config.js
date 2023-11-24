const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.host,
  database: process.env.Database,
  username: process.env.Username,
  port: 3306,
  password: process.env.Password,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;

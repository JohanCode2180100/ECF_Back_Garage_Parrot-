const mysql = require("mysql2");
const config = require("../db/config.json");

const db = mysql.createConnection({
  host: "mysql-examenstudi.alwaysdata.net",
  port: 3306,
  database: "examenstudi_ecf23garageparrot",
  user: "333884_v_parrot",
  password: "StudiV.Parrot@2023",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;

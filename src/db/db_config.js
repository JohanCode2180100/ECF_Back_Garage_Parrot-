const mysql = require("mysql2");

const dataConfigDB = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "",
  database: process.env.DB_NAME || "garageParrot",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
};
const db = mysql.createConnection({
  host: dataConfigDB.host,
  port: dataConfigDB.port,
  database: dataConfigDB.database,
  user: dataConfigDB.user,
  password: dataConfigDB.password,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;

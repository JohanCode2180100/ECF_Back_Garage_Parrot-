const mysql = require("mysql2");
const config = require("./assets/config.json");

const db = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
});

db.connect((err) => {
  if (err) console.log(err.message);
  else console.log("connected ");
});

module.exports = db;

const mysql = require("mysql2");
const config = require("./config.json");

const db = mysql.createConnection(
  process.env.JAWSDB_URL || {
    host: config.host,
    user: config.user,
    database: config.database,
  }
);

db.connect((err) => {
  if (err) console.log(err.message);
  else console.log("connected ");
});

module.exports = db;

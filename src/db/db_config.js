const mysql = require("mysql2");
const config = require("./config.json");

let db;

if (process.env.NODE_ENV === "development") {
  db = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
  });
} else {
  db = mysql.createConnection(process.env.JAWSDB_URL);
}

db.connect((err) => {
  if (err) console.log(err.message);
  else console.log("connected ");
});

module.exports = db;

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "garageParrot",
});

db.connect((err) => {
  if (err) console.log(err.message);
  else console.log("connected ");
});

module.exports = db;

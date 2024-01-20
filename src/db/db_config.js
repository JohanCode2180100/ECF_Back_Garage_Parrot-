const mysql = require("mysql2");
const config = require("./config.json");

let db;

if (process.env.NODE_ENV === "production") {
  db = mysql.createConnection(
    "mysql://pnaolnsapr1qksjt:la2jyst62spg9k5v@x71wqc4m22j8e3ql.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/j0bddmuwnl0317em"
  );
} else {
  db = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
  });
}

db.connect((err) => {
  if (err) console.log(err.message);
  else console.log("connected ");
});

module.exports = db;

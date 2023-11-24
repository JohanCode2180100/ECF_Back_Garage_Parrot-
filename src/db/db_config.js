const mysql = require("mysql2");

const db = mysql.createConnection(
  "mysql://f8u0cskxvdi841jj:q8zl21d4xuys8k3e@wb39lt71kvkgdmw0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/g0tvm76q649v2pp0"
);

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;

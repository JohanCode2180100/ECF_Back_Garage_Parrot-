const bcrypt = require("bcrypt");
const db = require("../db/db_config");
const jwt = require("jsonwebtoken");
require("dotenv").config;

exports.login = (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;

  const checkedEmail = "SELECT * FROM admin WHERE Email = ?";

  // Création d'une promesse pour la requête SQL
  const queryPromise = new Promise((resolve, reject) => {
    db.query(checkedEmail, [Email], (err, results) => {
      if (err) {
        console.error("l'utilisateur demandé n'existe pas", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  queryPromise
    .then((results) => {
      if (results.length === 0) {
        console.error("Email ou mot de passe incorrect");
        return res.redirect("/api/login");
      }
      //je recupere la premiere ligne correspondante de l'array Admin
      const admin = results[0];

      bcrypt
        .compare(Password, admin.Password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.admin = admin;
            return req.session.save((err) => {
              console.log(err);
            });
          }
          //JWT
          const token = jwt.sign({ userId: admin.id }, process.env.JWT_TOKEN, {
            expiresIn: "24h",
          });

          const message = "Connexion reussi...";
          return res.json({ message, data: admin, token });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

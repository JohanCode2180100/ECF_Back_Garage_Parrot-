const bcrypt = require("bcrypt");
const db = require("../../db/db_config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const regexEmail =
  /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net|fr)/;

exports.login = (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res
      .status(400)
      .json({ message: "Les champs email et mot de passe sont requis." });
  }

  //test regex
  if (!regexEmail.test(userEmail)) {
    return res
      .status(400)
      .json({ message: "L'adresse email n'est pas valide." });
  }
  const getAccount = () => {
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM employes WHERE email = ?",
        [userEmail],
        (error, results) => {
          if (error) {
            console.error(
              "Erreur lors de l'exécution de la requête SELECT :",
              error
            );

            reject(error);
          } else {
            if (results.length === 0) {
              console.error(
                "Aucun utilisateur trouvé pour l'adresse e-mail :",
                userEmail
              );
            }
            resolve(results);
          }
        }
      );
    });
  };

  getAccount()
    .then((results) => {
      if (!results || results.length === 0 || !results[0].password) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }
      const user = results[0].password;
      bcrypt.compare(userPassword, user, function (err, match) {
        if (err) {
        }
        if (match) {
          const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN, {
            expiresIn: "1h",
          });

          res.status(200).json({ token, expiresIn: 3600 });
        } else {
          return res
            .status(401)
            .json({ message: "Échec de l'authentification" });
        }
      });
    })
    .catch((err) => {
      console.error("erreur lors de la récupération du compte", err);
      res.status(500).json({ error: "une erreur s est produite" });
    });
};

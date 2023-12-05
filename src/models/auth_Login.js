const bcrypt = require("bcrypt");
const db = require("../db/db_config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = (req, res) => {
  let user;
  const { userEmail, userPassword } = req.body;

  db.query(
    "SELECT * FROM admin WHERE Email = ?",
    [userEmail],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la requête SQL :", err);
        return res
          .status(500)
          .json({ message: "Erreur lors de la requête SQL" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Utilisateur inconnu" });
      }

      user = results[0];
      const isPasswordValid = bcrypt.compareSync(userPassword, user.Password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Génération d'un jeton JWT si le mot de passe est valide
      //Token en dur pour ecf cause de non deploiement sinon dans .env
      const token = jwt.sign({ email: user.Email }, process.env.JWT_TOKEN, {
        expiresIn: "1h",
      });

      res.status(200).json({ token: token, expiresIn: 3600 });
    }
  );
};

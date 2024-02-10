const db = require("../../db/db_config");
const bcrypt = require("bcrypt");

exports.userValidationExists = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Les champs email et mot de passe sont requis." });
  }

  const getSearchMail = () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM employes WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            console.error("Erreur lors de l'exécution de la requête", error);
            reject(error);
          } else {
            resolve(results.length > 0);
          }
        }
      );
    });
  };

  getSearchMail()
    .then((exists) => {
      return res.status(200).json({ exists });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Erreur de serveur" });
    });
};

exports.addAdmin = (req, res) => {
  const saltRounds = 10;
  const { email, password } = req.body;

  if (!email & !password) {
    return res
      .status(400)
      .json({ message: "Les champs email et mot de passe sont requis." });
  }

  bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error("Erreur lors du hachage du mot de passe :", hashErr);
      return res
        .status(500)
        .json({ message: "Erreur lors du hachage du mot de passe" });
    }

    const adminInsertQuery = `
      INSERT INTO employes (email, password)
      VALUES (?, ?)
    `;

    db.query(adminInsertQuery, [email, hashedPassword], (insertErr, result) => {
      if (insertErr) {
        console.error(
          "Erreur lors de l'insertion de l'administrateur : ",
          insertErr
        );
        return res.status(500).json({
          message: "Erreur lors de l'insertion de l'administrateur",
        });
      }

      console.log("Administrateur ajouté avec succès.");
      res.status(200).json({ message: "Administrateur ajouté avec succès." });
    });
  });
};

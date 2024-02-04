const db = require("../../db/db_config");
const bcrypt = require("bcrypt");
exports.addAdmin = (req, res) => {
  const saltRounds = 10;
  const { userEmail, userPassword } = req.body;

  if (!userEmail & !userPassword) {
    return res
      .status(400)
      .json({ message: "Les champs email et mot de passe sont requis." });
  }

  bcrypt.hash(userPassword, saltRounds, (hashErr, hashedPassword) => {
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

    db.query(
      adminInsertQuery,
      [userEmail, hashedPassword],
      (insertErr, result) => {
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
      }
    );
  });
};

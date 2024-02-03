const db = require("../../db/db_config");
const bcrypt = require("bcrypt");
exports.addAdmin = (req, res) => {
  const saltRounds = 12; // Tour de Hachage = 12

  const { userEmail, userPassword } = req.body;

  
  bcrypt.hash(userPassword, saltRounds, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error("Erreur lors du hachage du mot de passe :", hashErr);
      return res
        .status(500)
        .json({ message: "Erreur lors du hachage du mot de passe" });
    }

    console.log("Mot de passe hashé :", hashedPassword);

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

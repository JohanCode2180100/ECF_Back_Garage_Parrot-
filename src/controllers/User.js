/*------------------------------------------------------------------------------ 
-----------------------------------TABLE ADMIN----------------------------------
------------------------------------------------------------------------------*/
const db = require("../db/db_config");
require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = 10; // Tour de Hachage = 10

bcrypt.hash(
  //.env en gitignore
  process.env.PASSWORD_HASH_SECRET,
  saltRounds,
  (err, hashedPassword) => {
    if (err) {
      console.error("Erreur lors du hachage du mot de passe :", err);
    } else {
      console.log("Mot de passe hashé :");

      const adminInsertQuery = `
                  INSERT INTO employes (Email, Password, Permission)
                  VALUES ('v.parrot@ecf2023.fr', '${hashedPassword}', 1)
                `;

      db.query(adminInsertQuery, [hashedPassword], (err, result) => {
        if (err) {
          console.error(
            "Erreur lors de l'insertion de l'administrateur : ",
            err
          );
          throw err;
        } else {
          console.log("Administrateur ajouté avec succès.");
        }
      });
    }
  }
);

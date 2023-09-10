/*------------------------------------------------------------------------------ 
-----------------------------------TABLE ADMIN----------------------------------
------------------------------------------------------------------------------*/
const db = require("../db/db_config");
require("dotenv").config();
const bcrypt = require("bcrypt");

// Check pour voir si la table existe
const checkAdminTableExists = () => {
  const checkTableQuery = "SHOW TABLES LIKE 'Admin'";

  return new Promise((resolve, reject) => {
    db.query(checkTableQuery, (err, results) => {
      if (err) {
        console.error("Erreur lors de la vérification de la table :", err);
        reject(err);
      } else {
        const tableExists = results.length > 0;
        resolve(tableExists);
      }
    });
  });
};

const createAdminTableIfNotExists = async () => {
  try {
    const tableExists = await checkAdminTableExists();

    if (!tableExists) {
      const createTableQuery = `
          CREATE TABLE Admin (
            Admin_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            Email VARCHAR(50) NOT NULL,
            Password VARCHAR(60) NOT NULL, -- Utilisez VARCHAR(60) pour stocker le hachage
            Permission TINYINT(1)
          ) ENGINE=INNODB
        `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table Admin: ", err);
          throw err;
        } else {
          console.log("Table Admin créée avec succès");

          const saltRounds = 10; // Tour de Hachage = 10

          // Hasher le mot de passe avec la clé secrète
          bcrypt.hash(
            process.env.PASSWORD_HASH_SECRET,
            saltRounds,
            (err, hashedPassword) => {
              if (err) {
                console.error("Erreur lors du hachage du mot de passe :", err);
              } else {
                console.log("Mot de passe hashé :");

                const adminInsertQuery = `
                  INSERT INTO Admin (Email, Password, Permission)
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
        }
      });
    } else {
      console.log("La table 'Admin' existe déjà.");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de la table :", error);
  }
};

module.exports = { createAdminTableIfNotExists };

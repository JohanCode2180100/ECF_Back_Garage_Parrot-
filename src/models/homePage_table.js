/*------------------------------------------------------------------------------ 
-----------------------------------TABLE HOME_PAGE----------------------------------
------------------------------------------------------------------------------*/
const db = require("../db/db_config");

const checkHomePageTableExists = () => {
  const checkTableQuery = "SHOW TABLES LIKE 'Home_page'";

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

const createHomePageTableIfNotExists = async () => {
  try {
    const tableExists = await checkHomePageTableExists();

    if (!tableExists) {
      const createTableQuery = `
          CREATE TABLE Home_page(
            Home_page_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            Title VARCHAR(255) NOT NULL,
            Admin_id INT(11), 
            FOREIGN KEY (Admin_id) REFERENCES Admin(Admin_id)
          ) ENGINE=INNODB
        `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table : ", err);
          throw err;
        } else {
          console.log("Table créée avec succès");

          const insertDataQuery = `
          INSERT INTO Home_page (Title) 
          VALUES
          ('CONFIEZ VOTRE VEHICULE A DES MAINS EXPERTES'),
          ('DÉCOUVREZ LES PRESTATIONS PROPOSÉES PAR LES RÉPARATEURS DU GARAGE PARROT'),
          ('NOS ENGAGEMENTS GARAGE PARROT')
          `;
          db.query(insertDataQuery, (err, result) => {
            if (err) {
              console.log("erreur insertion des données", err);
            } else {
              console.log("Insertion des données réalisées");
            }
          });
        }
      });
    } else {
      console.log("La table 'Home_page' existe déjà.");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de la table :", error);
  }
};
module.exports = { createHomePageTableIfNotExists };

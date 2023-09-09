/*------------------------------------------------------------------------------ 
------------------------TABLE OPENING_HOURS with DATA---------------------------
------------------------------------------------------------------------------*/
const db = require("../db/db_config");

const checkOpeningHoursTableExists = () => {
  const checkTableQuery = "SHOW TABLES LIKE 'Opening_hours'";

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

const createOpening_hoursTableIfNotExists = async () => {
  try {
    const tableExists = await checkOpeningHoursTableExists();

    if (!tableExists) {
      const createTableQuery = `
          CREATE TABLE Opening_Hours(
            Opening_Hours_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            Days VARCHAR(10) NOT NULL,
            Open_AM VARCHAR(10) NOT NULL,
            Close_AM VARCHAR(10) NOT NULL,
            Open_PM VARCHAR(10) NOT NULL,
            Close_PM VARCHAR(10) NOT NULL,
            Home_page_id INT(11),          
            FOREIGN KEY (Home_page_id) REFERENCES Home_page(Home_page_id)
          ) ENGINE=INNODB
        `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table : ", err);
          throw err;
        } else {
          console.log("Table OpeningHours créée avec succès");

          const insertDataQuery = `INSERT INTO Opening_hours (Days, Open_AM, Close_AM, Open_PM, Close_PM, Home_page_id)
          VALUES
          ('Lundi','08:45', '12:00','14:00','18:00',1),
          ('Mardi','08:45', '12:00','14:00','18:00',1),
          ('Mercredi','08:45', '12:00','14:00','18:00',1),
          ('Jeudi','08:45', '12:00','14:00','18:00',1),
          ('Vendredi','08:45', '12:00','14:00','18:00',1),
          ('Samedi','08:45', '12:00','Fermé','',1),
          ('Dimanche','Fermé','','','',1)`;

          db.query(insertDataQuery, (err, result) => {
            if (err) {
              console.log("erreur insertion des données", err);
            } else {
              console.log("Insertion des données réalisées");
            }
          });
        }
        //suite du code
      });
    } else {
      console.log("La table 'OpeningHours' existe déjà.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la table OpeningHours :",
      error
    );
  }
};

module.exports = { createOpening_hoursTableIfNotExists };

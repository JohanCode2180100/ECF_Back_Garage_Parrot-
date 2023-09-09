/*------------------------------------------------------------------------------ 
-----------------------------------TABLE SECTION----------------------------------
------------------------------------------------------------------------------*/
const db = require("../db/db_config");

const checkSectionTableExists = () => {
  const checkTableQuery = "SHOW TABLES LIKE 'Section'";

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

const createSectionTableIfNotExists = async () => {
  try {
    const tableExists = await checkSectionTableExists();

    if (!tableExists) {
      const createTableQuery = `
          CREATE TABLE Section (
            Section_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            Title VARCHAR(255) NOT NULL,
            Content TEXT, 
            Home_page_id INT(11),
            FOREIGN KEY (Home_page_id) REFERENCES Home_page(Home_page_id)
          ) ENGINE=INNODB
        `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table : ", err);
          throw err;
        } else {
          console.log("Table Section créée avec succès");
          const insertDataQuery = `
          INSERT INTO Section (Title, Content) 
          VALUES
          ('Réparation de carrosserie','Qu''il s''agisse de petites éraflures ou de dommages plus importants, notre équipe qualifiée possède l''expertise nécessaire pour redonner à votre véhicule son apparence d''origine. Chaque détail compte, et nous mettons tout en œuvre pour vous offrir des réparations de carrosserie précises et de qualité.' ),
          ('Mécanique des voitures', 'Nos mécaniciens expérimentés sont équipés pour diagnostiquer et résoudre efficacement tous les problèmes mécaniques de votre véhicule. De la simple maintenance aux réparations plus complexes, nous utilisons les dernières techniques pour assurer la performance et la sécurité de votre voiture.'),
          ('Entretien', 'L''entretien régulier est essentiel pour prolonger la durée de vie de votre voiture et maintenir ses performances optimales. Au Garage Automobile Parrot, nous proposons des services d''entretien complets, comprenant la vidange d''huile, la vérification des systèmes, le remplacement des filtres et bien plus encore.'),
          ('Véhicules d''occasion', 'Vous êtes à la recherche d''une nouvelle voiture ? Nous avons une sélection de pépites d''occasion toutes marques à saisir. Nos véhicules d''occasion sont certifiés par notre garage et contrôlés par nos experts mécaniciens. Consultez nos véhicules d''occasion et contactez-nous')`;
          db.query(insertDataQuery, (err, result) => {
            if (err) {
              console.log(
                "Erreur lors de l'insertion des données de la table Section",
                err
              );
            } else {
              console.log(
                "Insertion des données dans la table Section réalisée"
              );
            }
          });
        }
      });
    } else {
      console.log("La table 'Section' existe déjà.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la table Section :",
      error
    );
  }
};

module.exports = { createSectionTableIfNotExists };

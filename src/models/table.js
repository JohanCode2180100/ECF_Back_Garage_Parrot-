const db = require("../db/db_config");

/*------------------------------------------------------------------------------ 
-----------------------------------TABLE ADMIN----------------------------------
------------------------------------------------------------------------------*/

//check pour voir si la table existe
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
          Password VARCHAR(50) NOT NULL,
          Permission TINYINT(1)
        ) ENGINE=INNODB
      `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table Admin: ", err);
          throw err;
        } else {
          console.log("Table Admin créée avec succès");
        }
      });
    } else {
      console.log("La table 'Admin' existe déjà.");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de la table :", error);
  }
};

/*------------------------------------------------------------------------------ 
-----------------------------------TABLE SECTION----------------------------------
------------------------------------------------------------------------------*/

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

/*------------------------------------------------------------------------------ 
-----------------------------------TABLE IMAGE----------------------------------
------------------------------------------------------------------------------*/

const checkImageTableExists = () => {
  const checkTableQuery = "SHOW TABLES LIKE 'Image'";

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

const createImageTableIfNotExists = async () => {
  try {
    const tableExists = await checkImageTableExists();

    if (!tableExists) {
      const createTableQuery = `
        CREATE TABLE Image (
          Image_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
          Image_url VARCHAR(255) NOT NULL,
          Accessibility_text VARCHAR(255),
          Section_id INT(11),
          FOREIGN KEY (Section_id) REFERENCES Section(Section_id)
        ) ENGINE=INNODB
      `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table : ", err);
          throw err;
        } else {
          console.log("Table Image créée avec succès");
        }
      });
    } else {
      console.log("La table 'Image' existe déjà.");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de la table Image :", error);
  }
};



/*------------------------------------------------------------------------------ 
-----------------------------------REVIEW----------------------------------
------------------------------------------------------------------------------*/

const checkReviewTableExists = () => {
  const checkTableQuery = "SHOW TABLES LIKE 'Review'";

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

const createReviewTableIfNotExists = async () => {
  try {
    const tableExists = await checkReviewTableExists();

    if (!tableExists) {
      const createTableQuery = `
        CREATE TABLE Review(
          Review_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
          FirstName VARCHAR(255) NOT NULL,
          Containt VARCHAR(255) NOT NULL,
          Rank INT(1) NOT NULL,
          Status TINYINT(1) DEFAULT 1,
          CreatedAt DATE,
          Admin_id INT(11),          
          FOREIGN KEY (Admin_id) REFERENCES Admin(Admin_id)
        ) ENGINE=INNODB
      `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table : ", err);
          throw err;
        } else {
          console.log("Table Review créée avec succès");
        }
      });
    } else {
      console.log("La table 'Review' existe déjà.");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de la table Review :", error);
  }
};

/*------------------------------------------------------------------------------ 
-----------------------------------SECOND-HAND-CAR----------------------------------
------------------------------------------------------------------------------*/

const checkSecondHandCarTableExists = () => {
  const checkTableQuery = "SHOW TABLES LIKE 'Second_hand_car'";

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

const createSecondHandCarTableIfNotExists = async () => {
  try {
    const tableExists = await checkSecondHandCarTableExists();

    if (!tableExists) {
      const createTableQuery = `
        CREATE TABLE Second_hand_car(
          Second_hand_car_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
          Brand VARCHAR(255) NOT NULL,
          Name VARCHAR(255),
          Year INT(4),
          Price INT(7),
          Kilometer INT(6),
          Picture VARCHAR(255),
          Description VARCHAR(255),
          CreatedAt DATE,
          Admin_id INT(11),          
          FOREIGN KEY (Admin_id) REFERENCES Admin(Admin_id)
        ) ENGINE=INNODB
      `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table : ", err);
          throw err;
        } else {
          console.log("Table Second_hand_car créée avec succès");
        }
      });
    } else {
      console.log("La table 'Second_hand_car' existe déjà.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la table Second_hand_car :",
      error
    );
  }
};

/*------------------------------------------------------------------------------ 
-----------------------------------CONTACT_FORM--------------------------------------
------------------------------------------------------------------------------*/

const checkContactFormTableExists = () => {
  const checkTableQuery = "SHOW TABLES LIKE 'Contact_form'";

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

const createContactFormTableIfNotExists = async () => {
  try {
    const tableExists = await checkContactFormTableExists();

    if (!tableExists) {
      const createTableQuery = `
        CREATE TABLE Contact_form(
          Contact_form_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
          Name VARCHAR(255) NOT NULL,
          FirstName VARCHAR(255) NOT NULL,
          Adress VARCHAR(255) NOT NULL,
          Email VARCHAR(255) NOT NULL,
          Phone VARCHAR(10) NOT NULL,
          Message VARCHAR(255) NOT NULL,
          Admin_id INT(11),          
          FOREIGN KEY (Admin_id) REFERENCES Admin(Admin_id)
        ) ENGINE=INNODB
      `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table : ", err);
          throw err;
        } else {
          console.log("Table Contact_form créée avec succès");
        }
      });
    } else {
      console.log("La table 'Contact_form' existe déjà.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la table Contact_form :",
      error
    );
  }
};

/*------------------------------------------------------------------------------ 
-----------------------------------CAR CONTACT FORM-----------------------------
------------------------------------------------------------------------------*/

const checkCarContactFormTableExists = () => {
  const checkTableQuery = "SHOW TABLES LIKE 'Car_contact_form'";

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

const createCarContactFormTableIfNotExists = async () => {
  try {
    const tableExists = await checkCarContactFormTableExists();

    if (!tableExists) {
      const createTableQuery = `
        CREATE TABLE Car_contact_form(
          Car_contact_form_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
          Name VARCHAR(255) NOT NULL,
          FirstName VARCHAR(255) NOT NULL,
          Adress VARCHAR(255) NOT NULL,
          Email VARCHAR(255) NOT NULL,
          Phone VARCHAR(10) NOT NULL,
          Message VARCHAR(255) NOT NULL,
          Second_hand_car_id INT(11),          
          FOREIGN KEY (Second_hand_car_id) REFERENCES Second_hand_car(Second_hand_car_id)
        ) ENGINE=INNODB
      `;

      db.query(createTableQuery, (err, result) => {
        if (err) {
          console.error("Erreur lors de la création de la table : ", err);
          throw err;
        } else {
          console.log("Table Contact_car_form créée avec succès");
        }
      });
    } else {
      console.log("La table 'Contact_car_form' existe déjà.");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la table Contact_car_form :",
      error
    );
  }
};
module.exports = {
  createAdminTableIfNotExists,
  createSectionTableIfNotExists,
  createImageTableIfNotExists,
  createReviewTableIfNotExists,
  createSecondHandCarTableIfNotExists,
  createContactFormTableIfNotExists,
  createCarContactFormTableIfNotExists,
};

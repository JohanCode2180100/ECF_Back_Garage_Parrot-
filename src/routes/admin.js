const express = require("express");
const router = express.Router();
const db = require("../db/db_config");

/* ------------------------------------------------------------------------------------------
-----------------------------------------CRUD POST-----------------------------------------
--------------------------------------------------------------------------------------------- */

router.post("/api/second-hand-car", (req, res) => {
  const newCarData = req.body;

  const newCar = {
    ...newCarData,
    CreatedAt: new Date(),
  };

  const query =
    "INSERT INTO second_hand_car (Brand, Name, Year, Price, Kilometer, Picture, Description, CreatedAt) VALUES (?,?, ?, ?, ?, ?, ?, NOW())";

  const values = [
    newCar.Brand,
    newCar.Name,
    newCar.Year,
    newCar.Price,
    newCar.Kilometer,
    newCar.Picture,
    newCar.Description,
  ];

  db.promise()
    .execute(query, values)
    .then(([results]) => {
      console.log("Nouvelle voiture insérée avec succès !");
      const message = `Le véhicule ${newCar.Brand} a bien été enregistré`;
      res.json({ message, newCar });
    })
    .catch((err) => {
      console.error("Erreur lors de l'insertion :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de l'insertion en base de données" });
    });
});

/* ------------------------------------------------------------------------------------------
-----------------------------------------CRUD GET-----------------------------------------
--------------------------------------------------------------------------------------------- */
router.get("/api/second-hand-car", (req, res) => {
  const getCarsDatabase = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM second_hand_car", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  getCarsDatabase()
    .then((cars) => {
      const message = "La liste des voitures a bien été récupérée";
      res.json({ message, cars });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des voitures ", err);
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la récupération des voitures !!!",
      });
    });
});

//REVIEW

router.get("/api/review", (req, res) => {
  const getReviewDatabase = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM review", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  getReviewDatabase()
    .then((reviews) => {
      const message = "Liste des avis recuperes";
      res.json({ message, reviews });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des avis ", err);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la récupération des avis !!!",
      });
    });
});

router.get("/api/review/pending", (req, res) => {
  const getReviewPendingStatus = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM review WHERE Status ='1'", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  getReviewPendingStatus()
    .then((reviewStatus) => {
      const message = "Liste des avis en attente recuperé";
      res.json({ message, reviewStatus });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des avis ", err);
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la récupération des avis en attente de validation!!!",
      });
    });
});

//CONTACT

router.get("/api/contact", (req, res) => {
  const getContactDatabase = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM contact_form", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  getContactDatabase()
    .then((contact) => {
      const message = "Les formulaires ont été récupérés";
      res.json({ message, contact });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des formulaires ", err);
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la récupération des formulaires !!!",
      });
    });
});

/* ------------------------------------------------------------------------------------------
-----------------------------------------CRUD UPDATE-----------------------------------------
--------------------------------------------------------------------------------------------- */
//cars
router.put("/api/second-hand-car/:id", (req, res) => {
  const updatedCarByIdDatabase = (id, carData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE second_hand_car SET Brand = ?, Name = ?, Year = ?, Price = ?, Kilometer = ?, Picture = ?, Description = ? WHERE second_hand_car_id = ?",
        [
          carData.Brand,
          carData.Name,
          carData.Year,
          carData.Price,
          carData.Kilometer,
          carData.Picture,
          carData.Description,
          id,
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  const id = parseInt(req.params.id);
  const carData = req.body;

  updatedCarByIdDatabase(id, carData)
    .then((results) => {
      if (results.affectedRows === 0) {
        res
          .status(404)
          .json({ error: `La voiture avec l'ID ${id} n'a pas été trouvée.` });
      } else {
        const message = `La voiture avec l'ID ${id} a bien été modifiée.`;
        res.json({ message, carData });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de la voiture", error);
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la mise à jour de la voiture.",
      });
    });
});
//HOURS
// Route PUT pour mettre à jour les horaires
router.put("/api/hours/:id", (req, res) => {
  const updatedHours = (id, hoursData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE opening_hours SET Days = ?, Open_AM = ?, Close_AM = ?, Open_PM = ?, Close_PM = ? WHERE opening_hours_id = ?",
        [
          hoursData.Days,
          hoursData.Open_AM,
          hoursData.Close_AM,
          hoursData.Open_PM,
          hoursData.Close_PM,
          id,
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  const id = parseInt(req.params.id);
  const hoursData = req.body;

  updatedHours(id, hoursData)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          error: `L'horaire de ${hoursData.Days} n'a pas été trouvé.`,
        });
      } else {
        const message = `L'horaire de ${hoursData.Days} a bien été modifié.`;
        res.json({ message, hoursData });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour des horaires...", error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour des horaires.",
      });
    });
});

//REVIEW

router.put("/api/reviewPending/:id", (req, res) => {
  const updatedStatusReviewByIdDatabase = (id, carData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE review SET Status = 2 WHERE Review_id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  const id = parseInt(req.params.id);

  updatedStatusReviewByIdDatabase(id)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          error: `L'avis en attente avec l'ID ${id} n'a pas été trouvé.`,
        });
      } else {
        const message = `L'avis avec l'ID ${id} a bien été modifié en Status (2 validé).`;
        res.json({ message });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de l'avis", error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour de l'avis.",
      });
    });
});

//Home_page

router.put("/api/home_page/:id", (req, res) => {
  const updatedTitle = (id, ContainTitle) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE home_page SET Title = ? WHERE home_page_id = ?",
        [ContainTitle.title, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  const id = parseInt(req.params.id);
  const ContainTitle = req.body;

  updatedTitle(id, ContainTitle)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          error: `le titre n° ${id} n'a pas été trouvé.`,
        });
      } else {
        const message = `Le titre n° ${id} a bien été modifié.`;
        res.json({ message, ContainTitle });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour des titres...", error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour des titres.",
      });
    });
});
//SECTION

router.put("/api/section/:id", (req, res) => {
  const updateSection = (id, updatedFields) => {
    return new Promise((resolve, reject) => {
      // Je gére dynamiquement la requete en fonction des champs fournis
      const updateQuery = [];
      const queryParams = [];

      for (const key in updatedFields) {
        updateQuery.push(`${key} = ?`);
        queryParams.push(updatedFields[key]);
      }
      //si pas de champs fournis
      if (updateQuery.length === 0) {
        // Aucun champ à mettre à jour, renvoyer une erreur
        return reject(new Error("Aucun champ spécifié pour la mise à jour."));
      }
      //mettre l'id à la fin de la requete
      queryParams.push(id);

      db.query(
        `UPDATE section SET ${updateQuery.join(", ")} WHERE Section_id = ?`,
        queryParams,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  const id = parseInt(req.params.id);
  const updatedFields = req.body;

  updateSection(id, updatedFields)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          error: `La section n° ${id} n'a pas été trouvée.`,
        });
      } else {
        const message = `La section n° ${id} a bien été modifiée.`;
        res.json({ message, updatedFields });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de la section...", error);
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la mise à jour de la section.",
      });
    });
});

/* ------------------------------------------------------------------------------------------
-----------------------------------------CRUD DELETE-----------------------------------------
--------------------------------------------------------------------------------------------- */

router.delete("/api/second-hand-car/:id", (req, res) => {
  const deleteCarByIdDatabase = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM second_hand_car WHERE second_hand_car_id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  //extraction de l'id passé dans l'url
  const id = req.params.id;
  deleteCarByIdDatabase(id)
    .then((car) => {
      const message = `La voiture ${car} a bien été supprimé`;
      res.json({ message });
    })
    .catch((err) => {
      console.error("erreur lors de la suppression de la voiture", err);
      res.status(500).json({
        err: "une erreur s'est produite lors de la supression de la voiture !!!",
      });
    });
});

//REVIEW

router.delete("/api/review/:id", (req, res) => {
  const deleteReviewByIdDatabase = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM review WHERE review_id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  //extraction de l'id passé dans l'url
  const id = req.params.id;
  deleteReviewByIdDatabase(id)
    .then(() => {
      const message = `L'avis ${id} a bien été supprimé`;
      res.json({ message });
    })
    .catch((err) => {
      console.error("erreur lors de la suppression de l'avis", err);
      res.status(500).json({
        err: "une erreur s'est produite lors de la supression de l'avis !!!",
      });
    });
});
//CONTACT

router.delete("/api/contact/:id", (req, res) => {
  const deleteFormByIdDatabase = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM contact_form WHERE contact_form_id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  //extraction de l'id passé dans l'url
  const id = req.params.id;
  deleteFormByIdDatabase(id)
    .then((form) => {
      const message = `Le formulaire n° ${id} a bien été supprimé`;
      res.json({ message });
    })
    .catch((err) => {
      console.error("erreur lors de la suppression du formulaire", err);
      res.status(500).json({
        err: "une erreur s'est produite lors de la supression du formulaire !!!",
      });
    });
});

module.exports = router;

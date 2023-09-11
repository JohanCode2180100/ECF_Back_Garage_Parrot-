const express = require("express");
const router = express.Router();
const db = require("../db/db_config");

/* ------------------------------------------------------------------------------------------
-----------------------------------------CRUD PUBLIC POST------------------------------------
--------------------------------------------------------------------------------------------- */

//CONTACT
router.post("/api/contact", (req, res) => {
  const newFormData = req.body;

  // verification supplémentaire données coté BackEND
  if (
    !newFormData.Name ||
    !newFormData.FirstName ||
    !newFormData.Adress ||
    !newFormData.Email ||
    !newFormData.Phone ||
    !newFormData.Message
  ) {
    return res.status(400).json({
      error: "Toutes les données obligatoires doivent être fournies.",
    });
  }

  const form = {
    ...newFormData,
  };

  const query =
    "INSERT INTO contact_form (Name,FirstName, Adress, Email,Phone, Message) VALUES (?,?,?,?,?,?)";

  const values = [
    form.Name,
    form.FirstName,
    form.Adress,
    form.Email,
    form.Phone,
    form.Message,
  ];

  db.promise()
    .execute(query, values)
    .then(([results]) => {
      console.log("Formulaire en bdd !");
      const message = `Le formulaire a bien été enregistré`;
      res.json({ message, form });
    })
    .catch((err) => {
      console.error("Erreur lors de l'insertion :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de l'insertion en base de données" });
    });
});

//REVIEW
router.post("/api/review", (req, res) => {
  const newReviewData = req.body;

  const newReview = {
    ...newReviewData,
    CreatedAt: new Date(),
  };

  const query =
    "INSERT INTO Review (FirstName, Containt, Rank, CreatedAt) VALUES (?, ?, ?, NOW())";

  const values = [newReview.FirstName, newReview.Containt, newReview.Rank];

  db.promise()
    .execute(query, values)
    .then(([results]) => {
      console.log("Nouvelle avis inséré avec succès !");
      const message = `L'avis a bien été enregistré`;
      res.json({ message, newReview });
    })
    .catch((err) => {
      console.error("Erreur lors de l'insertion :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de l'insertion en base de données" });
    });
});

/* ------------------------------------------------------------------------------------------
-----------------------------------------CRUD PUBLIC GET------------------------------------
--------------------------------------------------------------------------------------------- */
//HOME PAGE

// Déclaration de la route GET dans l'objet app
router.get("/api/home_page", (req, res) => {
  const getHomePage = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM home_page", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  getHomePage()
    .then((title) => {
      const message = "Le titre de la page d'accueil a été récupéré";
      res.json({ message, title });
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la récupération du titre de la page d'accueil a été récupéré",
        err
      );
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la récupération du titre de la page d'accueil a été récupéré",
      });
    });
});
//SECTION

router.get("/api/section", (req, res) => {
  const getSection = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM section", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  getSection()
    .then((section) => {
      const message = "Les sections ont été récupérées";
      res.json({ message, section });
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la récupération des sections de la page d'accueil",
        err
      );
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la récupération des sections de la page d'accueil",
      });
    });
});

//CAR

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

router.get("/api/second-hand-car/:id", (req, res) => {
  const getCarByIdDatabase = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM second_hand_car WHERE second_hand_car_id = ?",
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

  getCarByIdDatabase(id)
    .then((car) => {
      const message = "La voiture a bien été récupérée";
      res.json({ message, car });
    })
    .catch((err) => {
      console.error("erreur lors de la récupération de la voiture", err);
      res.status(500).json({
        err: "une erreur s'est produite lors de la récupération de la voiture !!!",
      });
    });
});

//REVIEW

router.get("/api/review/valid", (req, res) => {
  const getReviewValidetedStatus = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM review WHERE Status ='2'", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  getReviewValidetedStatus()
    .then((reviewStatus) => {
      const message = "Liste des avis validés recuperé";
      res.json({ message, reviewStatus });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des avis ", err);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la récupération des avis !!!",
      });
    });
});

//HOURS

// Déclaration de la route GET dans l'objet app
router.get("/api/hours", (req, res) => {
  const getHours = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM opening_hours", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  getHours()
    .then((hours) => {
      const message = "Les horaires ont été récupérés";
      res.json({ message, hours });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des horaires", err);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la récupération des horaires",
      });
    });
});

//HOME

router.get("/api/home_page", (req, res) => {
  const getHomePage = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM home_page", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  getHomePage()
    .then((title) => {
      const message = "Le titre de la page d'accueil a été récupéré";
      res.json({ message, title });
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la récupération du titre de la page d'accueil a été récupéré",
        err
      );
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la récupération du titre de la page d'accueil a été récupéré",
      });
    });
});

/* ------------------------------------------------------------------------------------------
-----------------------------------------CRUD PUBLIC UPDATE------------------------------------
--------------------------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------------------------
-----------------------------------------CRUD PUBLIC DELETE------------------------------------
--------------------------------------------------------------------------------------------- */

module.exports = router;

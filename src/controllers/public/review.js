const db = require("../../db/db_config");
exports.createReview = (req, res) => {
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
};

exports.validatedReview = (req, res) => {
  const getReviewValidetedStatus = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Review WHERE Status ='2'", (error, results) => {
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
};

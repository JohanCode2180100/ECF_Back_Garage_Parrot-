const db = require("../../db/db_config");
exports.createReview = (req, res) => {
  const newReviewData = req.body;

  const regexFirstname = /^[A-Za-zéèÉÈ\\- ]+$/;
  const regexContaint = /^[A-Za-z0-9() -]+$/;
  const regexNote = /^[0-9]+$/;

  if (
    !newReviewData.firstName ||
    !newReviewData.containt ||
    !newReviewData.note
  ) {
    return res
      .status(400)
      .json({ error: "Certains champs sont manquants dans la requête." });
  }
  //test regex
  if (!regexFirstname.test(newReviewData.firstName)) {
    return (
      
      res.status(400).json({ message: "Le prénom n'est pas valide" })
    );
  }
  if (!regexContaint.test(newReviewData.containt)) {
    return (
      
      res.status(400).json({ message: "Le contenu n'est pas valide" })
    );
  }
  if (!regexNote.test(newReviewData.note)) {
    return (
      
      res.status(400).json({ message: "La note n'est pas valide" })
    );
  }

  const newReview = {
    ...newReviewData,
    createdAt: new Date(),
  };

  const query =
    "INSERT INTO review (firstName, containt, note,status, createdAt) VALUES (?, ?, ?, 1, NOW())";

  const values = [newReview.firstName, newReview.containt, newReview.note];
  console.log("Valeurs à insérer :", values);
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
      db.query("SELECT * FROM review WHERE status ='2'", (error, results) => {
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

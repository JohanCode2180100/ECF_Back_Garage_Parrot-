module.exports = (app, db) => {
  app.post("/api/review", (req, res) => {
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
};

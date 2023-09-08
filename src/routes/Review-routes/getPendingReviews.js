module.exports = (app, db) => {
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

  app.get("/api/review/pending", (req, res) => {
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
};

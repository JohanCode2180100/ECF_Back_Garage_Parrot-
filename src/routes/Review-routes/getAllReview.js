module.exports = (app, db) => {
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

  app.get("/api/review", (req, res) => {
    getReviewDatabase()
      .then((reviews) => {
        const message = "Liste des avis recuperes";
        res.json({ message, reviews });
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des avis ", err);
        res.status(500).json({
          error:
            "Une erreur s'est produite lors de la récupération des avis !!!",
        });
      });
  });
};

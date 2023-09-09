module.exports = (app, db) => {
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
  
    app.get("/api/review/valid", (req, res) => {
        getReviewValidetedStatus()
        .then((reviewStatus) => {
          const message = "Liste des avis validés recuperé";
          res.json({ message, reviewStatus });
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


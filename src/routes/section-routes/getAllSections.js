module.exports = (app, db) => {
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
  app.get("/api/section", (req, res) => {
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
};

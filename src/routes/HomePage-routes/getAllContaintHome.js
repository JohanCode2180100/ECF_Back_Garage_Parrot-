module.exports = (app, db) => {
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

  // Déclaration de la route GET dans l'objet app
  app.get("/api/home_page", (req, res) => {
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
};

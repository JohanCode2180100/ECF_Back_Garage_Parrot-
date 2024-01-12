const db = require("../../db/db_config");
exports.getHomepage = (req, res) => {
  const getHomePage = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM section_homepage", (error, results) => {
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
};

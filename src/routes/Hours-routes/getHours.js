module.exports = (app, db) => {
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

  // Déclaration de la route GET dans l'objet app
  app.get("/api/hours", (req, res) => {
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
};
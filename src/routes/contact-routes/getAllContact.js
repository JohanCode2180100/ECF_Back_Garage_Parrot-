module.exports = (app, db) => {
  const getContactDatabase = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM contact_form", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  app.get("/api/contact", (req, res) => {
    getContactDatabase()
      .then((contact) => {
        const message = "Les formulaires ont été récupérés";
        res.json({ message, contact });
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des formulaires ", err);
        res.status(500).json({
          error:
            "Une erreur s'est produite lors de la récupération des formulaires !!!",
        });
      });
  });
};

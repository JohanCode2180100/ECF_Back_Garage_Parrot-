module.exports = (app, db) => {
  const updatedHours = (id, hoursData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE opening_hours SET Days = ?, Open_AM = ?, Close_AM = ?, Open_PM = ?, Close_PM = ? WHERE opening_hours_id = ?",
        [
          hoursData.Days,
          hoursData.Open_AM,
          hoursData.Close_AM,
          hoursData.Open_PM,
          hoursData.Close_PM,
          id,
        ],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };

  // Route PUT pour mettre à jour les horaires
  app.put("/api/hours/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const hoursData = req.body;

    updatedHours(id, hoursData)
      .then((results) => {
        if (results.affectedRows === 0) {
          res.status(404).json({
            error: `L'horaire de ${hoursData.Days} n'a pas été trouvé.`,
          });
        } else {
          const message = `L'horaire de ${hoursData.Days} a bien été modifié.`;
          res.json({ message, hoursData });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour des horaires...", error);
        res.status(500).json({
          error:
            "Une erreur s'est produite lors de la mise à jour des horaires.",
        });
      });
  });
};

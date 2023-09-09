module.exports = (app, db) => {
  const updatedStatusReviewByIdDatabase = (id, carData) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE review SET Status = 2 WHERE Review_id = ?",
        [id],
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

  app.put("/api/reviewPending/:id", (req, res) => {
    const id = parseInt(req.params.id);

    updatedStatusReviewByIdDatabase(id)
      .then((results) => {
        if (results.affectedRows === 0) {
          res.status(404).json({
            error: `L'avis en attente avec l'ID ${id} n'a pas été trouvé.`,
          });
        } else {
          const message = `L'avis avec l'ID ${id} a bien été modifié en Status (2 validé).`;
          res.json({ message });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'avis", error);
        res.status(500).json({
          error: "Une erreur s'est produite lors de la mise à jour de l'avis.",
        });
      });
  });
};

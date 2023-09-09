module.exports = (app, db) => {
  const updateSection = (id, updatedFields) => {
    return new Promise((resolve, reject) => {
      // Je gére dynamiquement la requete en fonction des champs fournis
      const updateQuery = [];
      const queryParams = [];

      for (const key in updatedFields) {
        updateQuery.push(`${key} = ?`);
        queryParams.push(updatedFields[key]);
      }
      //si pas de champs fournis
      if (updateQuery.length === 0) {
        // Aucun champ à mettre à jour, renvoyer une erreur
        return reject(new Error("Aucun champ spécifié pour la mise à jour."));
      }
      //mettre l'id à la fin de la requete
      queryParams.push(id);

      db.query(
        `UPDATE section SET ${updateQuery.join(", ")} WHERE Section_id = ?`,
        queryParams,
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

  app.put("/api/section/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFields = req.body;

    updateSection(id, updatedFields)
      .then((results) => {
        if (results.affectedRows === 0) {
          res.status(404).json({
            error: `La section n° ${id} n'a pas été trouvée.`,
          });
        } else {
          const message = `La section n° ${id} a bien été modifiée.`;
          res.json({ message, updatedFields });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la section...", error);
        res.status(500).json({
          error:
            "Une erreur s'est produite lors de la mise à jour de la section.",
        });
      });
  });
};

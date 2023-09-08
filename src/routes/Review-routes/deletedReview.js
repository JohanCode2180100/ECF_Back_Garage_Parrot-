module.exports = (app, db) => {
  const deleteReviewByIdDatabase = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM review WHERE review_id = ?",
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
  app.delete("/api/review/:id", (req, res) => {
    //extraction de l'id passé dans l'url
    const id = req.params.id;
    deleteReviewByIdDatabase(id)
      .then(() => {
        const message = `L'avis ${id} a bien été supprimé`;
        res.json({ message });
      })
      .catch((err) => {
        console.error("erreur lors de la suppression de l'avis", err);
        res.status(500).json({
          err: "une erreur s'est produite lors de la supression de l'avis !!!",
        });
      });
  });
};

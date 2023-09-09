module.exports = (app, db) => {
  const deleteFormByIdDatabase = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM contact_form WHERE contact_form_id = ?",
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
  app.delete("/api/contact/:id", (req, res) => {
    //extraction de l'id passé dans l'url
    const id = req.params.id;
    deleteFormByIdDatabase(id)
      .then((form) => {
        const message = `Le formulaire n° ${id} a bien été supprimé`;
        res.json({ message });
      })
      .catch((err) => {
        console.error("erreur lors de la suppression du formulaire", err);
        res.status(500).json({
          err: "une erreur s'est produite lors de la supression du formulaire !!!",
        });
      });
  });
};

const db = require("../../db/db_config");

exports.updatedTitle = (req, res) => {
  const updatedTitle = (id, ContainTitle) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE home_page SET Title = ? WHERE home_page_id = ?",
        [ContainTitle.title, id],
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
  const id = parseInt(req.params.id);
  const ContainTitle = req.body;

  updatedTitle(id, ContainTitle)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          error: `le titre n° ${id} n'a pas été trouvé.`,
        });
      } else {
        const message = `Le titre n° ${id} a bien été modifié.`;
        res.json({ message, ContainTitle });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour des titres...", error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour des titres.",
      });
    });
};

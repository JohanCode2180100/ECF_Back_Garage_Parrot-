const db = require("../../db/db_config");

exports.updatedHomePage = (req, res) => {
  const updatedHomePage = (id, homePage) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE section_homepage SET Title = ?, content = ? WHERE section_homepage_id = ?",
        [homePage.title, homePage.content, id],
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
  const homePage = req.body;

  updatedHomePage(id, homePage)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          error: `le titre n° ${id} n'a pas été trouvé.`,
        });
      } else {
        const message = `Le titre n° ${id} et son contenu ont bien été modifiés.`;
        res.json({ message, homePage });
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour des titres...", error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour des titres.",
      });
    });
};

exports.getHomePageById = (req, res) => {
  const getHome_PageByID = (id) => {
    return new Promise((resolve, reject) => {
      // Ajoutez des parenthèses ici
      db.query(
        "SELECT * FROM section_homepage WHERE section_homepage_id = ? ",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    }); // Terminez la parenthèse ici
  };

  const id = req.params.id;

  getHome_PageByID(id)
    .then((homePage) => {
      const message = "Récupération du contenu";
      res.json({ message, homePage });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération du contenu", err);
      res.status(500).json({
        err: "Une erreur s'est produite lors de la récupération du contenu !!!",
      });
    });
};

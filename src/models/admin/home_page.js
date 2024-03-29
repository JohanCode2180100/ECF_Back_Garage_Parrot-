const db = require("../../db/db_config");

exports.updatedHomePage = (req, res) => {
  const updatedHomePage = (id, homePage) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE section_homePage SET title = ?, content = ? WHERE section_homePage_id = ?",
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

  const regexHomePage =
    /^[\p{L}\p{N}\s'"\.;:?À-ÖØ-öø-ÿ!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/u;
  if (!regexHomePage.test(homePage.title)) {
    return res.status(400).json("Le titre n'est pas valide ");
  }
  if (!regexHomePage.test(homePage.content)) {
    return res.status(400).json("Le contenu n'est pas valide ");
  }

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
      db.query(
        "SELECT * FROM section_homePage WHERE section_homePage_id = ? ",
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

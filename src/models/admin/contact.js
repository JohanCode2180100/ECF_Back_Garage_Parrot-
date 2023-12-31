const db = require("../../db/db_config");

exports.getContact = (req, res) => {
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
};

exports.deleteContact = (req, res) => {
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
};
